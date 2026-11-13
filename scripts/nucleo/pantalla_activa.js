(function () {
  'use strict';

  let bloqueo = null;
  let deseado = false;

  function pedir() {
    deseado = true;
    if (!navigator.wakeLock) return;
    navigator.wakeLock
      .request('screen')
      .then(function (nuevo) {
        bloqueo = nuevo;
      })
      .catch(function () {
        bloqueo = null;
      });
  }

  function liberar() {
    deseado = false;
    if (!bloqueo) return;
    bloqueo.release().catch(function () {});
    bloqueo = null;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && deseado) pedir();
  });

  window.Manual.nucleo.pantallaActiva = { pedir: pedir, liberar: liberar };
})();
