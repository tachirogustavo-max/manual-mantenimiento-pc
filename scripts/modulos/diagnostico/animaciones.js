(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;

  function pregunta(marco) {
    if (!Manual.nucleo.movimiento.animable() || !marco) return;
    window.gsap.from(dom.$$('.respuesta', marco), { x: 14, opacity: 0, duration: 0.32, ease: 'power2.out', stagger: 0.05, clearProps: 'opacity,transform' });
  }

  function resultado(raiz) {
    if (!Manual.nucleo.movimiento.animable()) return;
    window.gsap.from(dom.$$('.resultado__item', raiz), { x: -18, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.12, clearProps: 'opacity,transform' });
    window.gsap.from(dom.$$('.sello', raiz), {
      scale: 1.7,
      rotation: -10,
      opacity: 0,
      duration: 0.34,
      ease: 'power3.in',
      stagger: 0.12,
      delay: 0.25,
      clearProps: 'opacity,transform'
    });
  }

  Manual.modulos.diagnostico.animaciones = { pregunta: pregunta, resultado: resultado };
})();
