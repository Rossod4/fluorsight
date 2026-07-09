// App-wide state: React context + reducer, persisted to localStorage.
// Seeded with the demo dataset on first load; "Reset demo data" restores it.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type {
  AppState,
  Project,
  Sample,
  SampleStatus,
  ScreeningResult,
  Settings,
  Site,
} from '../types';
import { seedState } from '../data/seed';
import type { ScreeningImportRow } from '../lib/csv';

const STORAGE_KEY = 'aegis:v1';

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

type Action =
  | { type: 'addProject'; project: Project }
  | { type: 'updateProject'; project: Project }
  | { type: 'deleteProject'; projectId: string }
  | { type: 'addSite'; site: Site }
  | { type: 'updateSite'; site: Site }
  | { type: 'deleteSite'; siteId: string }
  | { type: 'addSample'; sample: Sample }
  | { type: 'updateSample'; sample: Sample }
  | { type: 'deleteSample'; sampleId: string }
  | { type: 'setStatus'; sampleId: string; status: SampleStatus; note?: string }
  | { type: 'addScreening'; sampleId: string; screening: ScreeningResult }
  | { type: 'importScreenings'; projectId: string; rows: ScreeningImportRow[] }
  | { type: 'updateSettings'; settings: Settings }
  | { type: 'reset' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'addProject':
      return { ...state, projects: [...state.projects, action.project] };
    case 'updateProject':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.project.id ? action.project : p)),
      };
    case 'deleteProject': {
      const siteIds = new Set(
        state.sites.filter((s) => s.projectId === action.projectId).map((s) => s.id),
      );
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.projectId),
        sites: state.sites.filter((s) => s.projectId !== action.projectId),
        samples: state.samples.filter((s) => !siteIds.has(s.siteId)),
      };
    }
    case 'addSite':
      return { ...state, sites: [...state.sites, action.site] };
    case 'updateSite':
      return { ...state, sites: state.sites.map((s) => (s.id === action.site.id ? action.site : s)) };
    case 'deleteSite':
      return {
        ...state,
        sites: state.sites.filter((s) => s.id !== action.siteId),
        samples: state.samples.filter((s) => s.siteId !== action.siteId),
      };
    case 'addSample':
      return { ...state, samples: [...state.samples, action.sample] };
    case 'updateSample':
      return {
        ...state,
        samples: state.samples.map((s) => (s.id === action.sample.id ? action.sample : s)),
      };
    case 'deleteSample':
      return { ...state, samples: state.samples.filter((s) => s.id !== action.sampleId) };
    case 'setStatus':
      return {
        ...state,
        samples: state.samples.map((s) =>
          s.id === action.sampleId
            ? {
                ...s,
                status: action.status,
                history: [
                  ...s.history,
                  { status: action.status, at: new Date().toISOString(), note: action.note },
                ],
              }
            : s,
        ),
      };
    case 'addScreening':
      return {
        ...state,
        samples: state.samples.map((s) =>
          s.id === action.sampleId
            ? {
                ...s,
                screenings: [...s.screenings, action.screening],
                status: s.status === 'new' ? 'screened' : s.status,
                history:
                  s.status === 'new'
                    ? [
                        ...s.history,
                        {
                          status: 'screened' as const,
                          at: new Date().toISOString(),
                          note: 'Screening result recorded.',
                        },
                      ]
                    : s.history,
              }
            : s,
        ),
      };
    case 'importScreenings': {
      const projectSites = state.sites.filter((s) => s.projectId === action.projectId);
      const byName = new Map(projectSites.map((s) => [s.name.trim().toLowerCase(), s]));
      const now = new Date().toISOString();
      const newSamples: Sample[] = [];
      let samples = state.samples;
      for (const row of action.rows) {
        const site = byName.get(row.siteName.trim().toLowerCase());
        if (!site) continue; // unmatched sites are reported by the caller before dispatch
        const screening: ScreeningResult = {
          id: uid('scr'),
          takenAt: row.collectedAt,
          signal: row.signal,
          estimatedBand: row.estimatedBand,
          confidence: row.confidence,
          operator: row.operator,
          notes: row.notes,
        };
        const existing =
          samples.find((s) => s.siteId === site.id && s.code === row.sampleCode) ??
          newSamples.find((s) => s.siteId === site.id && s.code === row.sampleCode);
        if (existing) {
          const updated: Sample = {
            ...existing,
            screenings: [...existing.screenings, screening],
            status: existing.status === 'new' ? 'screened' : existing.status,
            history:
              existing.status === 'new'
                ? [...existing.history, { status: 'screened' as const, at: now, note: 'Imported screening result.' }]
                : existing.history,
          };
          samples = samples.map((s) => (s.id === existing.id ? updated : s));
          const ni = newSamples.findIndex((s) => s.id === existing.id);
          if (ni >= 0) newSamples[ni] = updated;
        } else {
          newSamples.push({
            id: uid('sm'),
            siteId: site.id,
            code: row.sampleCode,
            collectedAt: row.collectedAt,
            status: 'screened',
            history: [
              { status: 'new', at: row.collectedAt, note: 'Created by CSV import.' },
              { status: 'screened', at: now, note: 'Imported screening result.' },
            ],
            screenings: [screening],
          });
        }
      }
      return { ...state, samples: [...samples, ...newSamples.filter((n) => !samples.includes(n))] };
    }
    case 'updateSettings':
      return { ...state, settings: action.settings };
    case 'reset':
      return seedState();
    default:
      return state;
  }
}

function loadInitial(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed && Array.isArray(parsed.projects) && parsed.settings?.thresholds) {
        return parsed;
      }
    }
  } catch {
    // corrupt storage — fall through to seed
  }
  return seedState();
}

interface StoreValue {
  state: AppState;
  dispatch: (action: Action) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full/unavailable — demo still works in memory
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useApp(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useApp must be used inside AppStoreProvider');
  return ctx;
}
