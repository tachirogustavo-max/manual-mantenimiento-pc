(function () {
  'use strict';

  function reducido() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function gsapDisponible() {
    return !!(window.gsap && window.ScrollTrigger);
  }

  function animable() {
    return gsapDisponible() && !reducido();
  }

  function comportamiento() {
    return reducido() ? 'auto' : 'smooth';
  }

  window.Manual.nucleo.movimiento = {
    gsapDisponible: gsapDisponible,
    animable: animable,
    comportamiento: comportamiento
  };
})();
