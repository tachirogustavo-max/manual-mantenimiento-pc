(function () {
  'use strict';

  const nucleo = window.Manual.nucleo;

  function irA(selector) {
    const destino = nucleo.dom.$(selector);
    if (!destino) return;
    destino.scrollIntoView({ behavior: nucleo.movimiento.comportamiento(), block: 'start' });
    if (window.history && window.history.replaceState) window.history.replaceState(null, '', selector);
  }

  function alDesplazar(oyente) {
    let pendiente = false;
    window.addEventListener(
      'scroll',
      function () {
        if (pendiente) return;
        pendiente = true;
        window.requestAnimationFrame(function () {
          pendiente = false;
          oyente();
        });
      },
      { passive: true }
    );
    oyente();
  }

  nucleo.desplazamiento = { irA: irA, alDesplazar: alDesplazar };
})();
