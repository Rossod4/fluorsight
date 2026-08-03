// Overflow guard for the A0 poster.
//
// Round 1 of the poster was written to an estimated word budget and came out
// 2.7x oversize. Estimating is the problem; this measures instead.
//
// Reports, on screen only:
//   - counted words of body copy (headings and captions excluded, since the
//     32pt floor applies to body text and that is what consumes the sheet)
//   - measured content height against the printable area
//   - any element whose computed font-size breaches the 32pt body / 18pt
//     caption floors the competition rules impose
//
// Nothing here affects the printed PDF.

(function () {
  const PT_PER_MM = 72 / 25.4;
  const BODY_FLOOR_PT = 32;
  const CAPTION_FLOOR_PT = 18;

  function ptOf(el) {
    const px = parseFloat(getComputedStyle(el).fontSize);
    // 1 CSS px = 1/96 in; 1pt = 1/72 in.
    return (px * 72) / 96;
  }

  function countWords(root) {
    let n = 0;
    root.querySelectorAll('p, li').forEach((el) => {
      if (el.closest('#guard')) return;
      if (el.classList.contains('caption')) return;
      const t = el.textContent.trim();
      if (t) n += t.split(/\s+/).length;
    });
    return n;
  }

  function checkTypeFloors(root) {
    const breaches = [];
    root.querySelectorAll('p, li, .stat .label').forEach((el) => {
      if (el.closest('#guard')) return;
      const isCaption = el.classList.contains('caption') || el.closest('.caption');
      const floor = isCaption ? CAPTION_FLOOR_PT : BODY_FLOOR_PT;
      const pt = ptOf(el);
      // Allow a hair of rounding slack.
      if (pt < floor - 0.5) {
        breaches.push({ pt: pt.toFixed(1), floor, text: el.textContent.trim().slice(0, 40) });
      }
    });
    return breaches;
  }

  function measure() {
    const sheet = document.querySelector('.sheet');
    if (!sheet) return;

    const words = countWords(sheet);
    const breaches = checkTypeFloors(sheet);

    // Does the content actually fit inside the sheet?
    const style = getComputedStyle(sheet);
    const padTop = parseFloat(style.paddingTop);
    const padBottom = parseFloat(style.paddingBottom);
    const available = sheet.clientHeight - padTop - padBottom;
    let contentHeight = 0;
    Array.from(sheet.children).forEach((c) => {
      contentHeight += c.getBoundingClientRect().height;
    });
    const gap = parseFloat(style.rowGap || style.gap || 0) || 0;
    contentHeight += gap * Math.max(0, sheet.children.length - 1);

    const overBy = contentHeight - available;
    const pctFull = ((contentHeight / available) * 100).toFixed(1);

    const guard = document.getElementById('guard') || (() => {
      const d = document.createElement('div');
      d.id = 'guard';
      document.body.appendChild(d);
      return d;
    })();

    const fitClass = overBy > 0 ? 'bad' : pctFull > 92 ? 'warn' : 'ok';
    const fitText =
      overBy > 0
        ? `OVER by ${(overBy / (PT_PER_MM * (96 / 72))).toFixed(0)}mm`
        : `fits (${pctFull}% full)`;

    const wordClass = words > 800 ? 'bad' : words > 720 ? 'warn' : 'ok';

    guard.innerHTML = [
      `<strong>A0 poster guard</strong>`,
      `words (body copy): <span class="${wordClass}">${words}</span> / 800 budget`,
      `vertical fit: <span class="${fitClass}">${fitText}</span>`,
      breaches.length
        ? `<span class="bad">${breaches.length} type-size breach(es)</span><br>` +
          breaches
            .slice(0, 4)
            .map((b) => `&nbsp;&nbsp;${b.pt}pt &lt; ${b.floor}pt — "${b.text}…"`)
            .join('<br>')
        : `<span class="ok">type sizes OK (32pt body / 18pt caption)</span>`,
      `<span style="color:#94a3b8">Print to PDF at 841×1189mm. Ctrl+P → Save as PDF → paper size A0.</span>`,
    ].join('<br>');
  }

  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);

  // Re-measure if the copy is edited live in devtools.
  //
  // Observe the SHEET only, never the document: measure() writes into #guard,
  // and an observer covering the whole document would see its own write and
  // re-enter forever. Debounced as well, because editing a panel fires many
  // mutations in a row and re-laying out an A0 sheet is not cheap.
  const sheet = document.querySelector('.sheet');
  if (sheet) {
    let pending = null;
    const schedule = () => {
      clearTimeout(pending);
      pending = setTimeout(measure, 150);
    };
    new MutationObserver(schedule).observe(sheet, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  }
})();
