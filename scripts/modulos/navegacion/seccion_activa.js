(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;

  function marcar(enlaces, id) {
    enlaces.forEach(function (enlace) {
      if (enlace.getAttribute('data-nav') === id) enlace.setAttribute('aria-current', 'location');
      else enlace.removeAttribute('aria-current');
    });
  }

  function iniciar() {
    if (!('IntersectionObserver' in window)) return;
    const enlaces = dom.$$('[data-nav]');
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) marcar(enlaces, entrada.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    dom.$$('main section[id]').forEach(function (seccion) {
      observador.observe(seccion);
    });
  }

  Manual.modulos.navegacion.seccionActiva = { iniciar: iniciar };
})();
