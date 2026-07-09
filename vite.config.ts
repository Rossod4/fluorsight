import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' + HashRouter keeps the site working on GitHub Pages subpaths
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
