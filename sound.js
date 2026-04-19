(function () {
  var root = (function () {
    var s = document.currentScript && document.currentScript.src;
    if (!s) return '';
    return s.replace(/sound\.js.*$/, '');
  })();

  var VOLUME = 0.2;
  var ctx = new (window.AudioContext || window.webkitAudioContext)();
  var buffers = {};

  var FILES = {
    root:    'sound/mixkit-sci-fi-click-900.wav',
    build:   'sound/mixkit-positive-interface-beep-221.wav',
    write:   'sound/mixkit-typing-on-a-laptop-keyboard-2531-1s.wav',
    gallery: 'sound/mixkit-camera-shutter-click-1133.wav',
    click:   'sound/mixkit-modern-technology-select-3124.wav',
  };

  Object.keys(FILES).forEach(function (key) {
    fetch(root + FILES[key])
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (ab) { return ctx.decodeAudioData(ab); })
      .then(function (buf) { buffers[key] = buf; })
      .catch(function () {});
  });

  function play(key) {
    var buf = buffers[key];
    if (!buf) return Promise.resolve();
    return ctx.resume().then(function () {
      var src = ctx.createBufferSource();
      src.buffer = buf;
      var gain = ctx.createGain();
      gain.gain.value = VOLUME;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start(0);
    });
  }

  function pageKey() {
    var p = location.pathname.replace(/index\.html$/, '');
    if (!p.endsWith('/')) p += '/';
    if (p.endsWith('/build/')) return 'build';
    if (p.endsWith('/write/')) return 'write';
    if (p.endsWith('/gallery/')) return 'gallery';
    if (p === '/' || p.endsWith('/anshuman-dev/')) return 'root';
    return null;
  }

  function keyForHref(href) {
    var path = href.replace(/^https?:\/\/[^/]+/, '').replace(/index\.html$/, '');
    if (!path.endsWith('/')) path += '/';
    if (path.endsWith('/build/')) return 'build';
    if (path.endsWith('/write/')) return 'write';
    if (path.endsWith('/gallery/')) return 'gallery';
    if (path === '/' || path === './') return 'root';
    return null;
  }

  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a.nav-tab').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var key = keyForHref(link.getAttribute('href'));
        if (!key) return;
        e.preventDefault();
        var dest = link.href;
        play(key).then(function () {
          setTimeout(function () { location.href = dest; }, 220);
        });
      });
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('a.nav-tab')) return;
      if (e.target.closest('a, button, [role="button"]')) play('click');
    });
  });
})();
