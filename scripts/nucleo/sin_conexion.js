(function () {
  'use strict';

  const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/;

  function registrar() {
    if (!('serviceWorker' in navigator) || window.location.protocol !== 'https:' || LOCAL.test(window.location.hostname)) return;
    let recargada = false;
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (recargada) return;
        recargada = true;
        window.location.reload();
      });
    }
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(function () {});
    });
  }

  window.Manual.nucleo.sinConexion = { registrar: registrar };
})();
