(function () {
  'use strict';

  const Manual = window.Manual;
  const navegacion = Manual.modulos.navegacion;
  const ESPERA_CIERRE_HOJA = 280;

  function iniciar() {
    document.addEventListener('click', function (evento) {
      const enlace = evento.target.closest('a[href^="#"]');
      if (!enlace) return;
      const destino = enlace.getAttribute('href');
      if (destino.length < 2 || destino.indexOf('#ficha-') === 0) return;
      evento.preventDefault();
      const enHoja = !!enlace.closest('.superposicion');
      if (enHoja) navegacion.hojaMas.cerrar();
      window.setTimeout(function () {
        Manual.nucleo.desplazamiento.irA(destino);
        if (destino === '#contenido') document.getElementById('contenido').focus({ preventScroll: true });
      }, enHoja ? ESPERA_CIERRE_HOJA : 0);
    });
  }

  function seccionDelAncla() {
    const ancla = window.location.hash.slice(1);
    if (!ancla || ancla.indexOf('ficha-') === 0) return null;
    return document.getElementById(ancla);
  }

  function irAlAnclaInicial() {
    if (!seccionDelAncla()) return;
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    function ir() {
      const destino = seccionDelAncla();
      if (destino) destino.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    if (document.readyState === 'complete') ir();
    else window.addEventListener('load', ir, { once: true });
  }

  navegacion.enlaces = { iniciar: iniciar, irAlAnclaInicial: irAlAnclaInicial };
})();
