/* On-screen overflow guard for the 7-slide deck.
 *
 * Slides are a fixed 338.67 x 190.5 mm with `overflow: hidden`, so content that
 * runs past the bottom is CROPPED SILENTLY — which is exactly what happened
 * before 1 Sept 2026, when all seven slides were over by 13-95 mm and nobody
 * could see it. This flags any breach in the corner of the offending slide.
 *
 * Screen only. It is inside a `@media print` display:none rule, so it never
 * reaches the exported PDF.
 */
(function () {
  var MM = 96 / 25.4;
  var FLOOR_PT = 20; // the deck's stated type floor

  function check() {
    document.querySelectorAll('.slide').forEach(function (s, i) {
      var old = s.querySelector('.measure-flag');
      if (old) old.remove();

      var padB = parseFloat(getComputedStyle(s).paddingBottom);
      var top = s.getBoundingClientRect().top;
      var bottom = 0;
      [].forEach.call(s.children, function (c) {
        if (c.classList && c.classList.contains('measure-flag')) return;
        bottom = Math.max(bottom, c.getBoundingClientRect().bottom - top);
      });
      var over = bottom - (s.clientHeight - padB);

      var small = [];
      s.querySelectorAll('*').forEach(function (e) {
        var ownText = [].some.call(e.childNodes, function (n) {
          return n.nodeType === 3 && n.textContent.trim();
        });
        if (!ownText) return;
        var pt = parseFloat(getComputedStyle(e).fontSize) * 72 / 96;
        if (pt < FLOOR_PT - 0.1) small.push(Math.round(pt) + 'pt');
      });

      if (over <= 0.5 && !small.length) return;

      var flag = document.createElement('div');
      flag.className = 'measure-flag';
      flag.textContent =
        (over > 0.5 ? 'SLIDE ' + (i + 1) + ' OVERFLOWS BY ' + (over / MM).toFixed(1) + 'mm' : '') +
        (over > 0.5 && small.length ? ' · ' : '') +
        (small.length ? 'UNDER ' + FLOOR_PT + 'pt: ' + small.join(', ') : '');
      s.appendChild(flag);
    });
  }

  window.addEventListener('load', function () { check(); setTimeout(check, 300); });
  window.addEventListener('resize', check);
})();
