(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const metodo = Manual.modulos.metodo;
  const ACTIVO = 'metodo__paso--activo';

  function pintar(lista) {
    const datos = Manual.datos.metodo;
    dom.$('#metodo-introduccion').textContent = datos.introduccion;
    datos.pasos.forEach(function (paso, i) {
      lista.appendChild(
        crear('li', { clase: 'metodo__paso' }, [
          crear('span', { clase: 'metodo__numero', texto: String(i + 1), 'aria-hidden': 'true' }),
          crear('div', { clase: 'metodo__contenido' }, [crear('h3', { texto: paso.titulo }), crear('p', { texto: paso.texto })])
        ])
      );
    });
  }

  function ajustarRiel(lista) {
    const ultimo = lista.lastElementChild;
    if (!ultimo) return;
    const centroNumero = 22;
    lista.parentElement.style.setProperty('--fin-riel', ultimo.offsetHeight - centroNumero + 'px');
  }

  function animar(lista, linea) {
    const pasos = dom.$$('.metodo__paso', lista);
    if (!Manual.nucleo.movimiento.animable()) {
      pasos.forEach(function (paso) {
        paso.classList.add(ACTIVO);
      });
      linea.style.transform = 'scaleY(1)';
      return;
    }
    window.gsap.set(linea, { scaleY: 0, transformOrigin: 'top center' });
    window.gsap.to(linea, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: lista, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 } });
    pasos.forEach(function (paso) {
      window.ScrollTrigger.create({
        trigger: paso,
        start: 'top 70%',
        onEnter: function () {
          paso.classList.add(ACTIVO);
        },
        onLeaveBack: function () {
          paso.classList.remove(ACTIVO);
        }
      });
    });
  }

  function iniciar() {
    const lista = dom.$('#metodo-pasos');
    const linea = dom.$('#metodo-linea');
    if (!lista) return;
    pintar(lista);
    const reajustar = function () {
      ajustarRiel(lista);
    };
    reajustar();
    window.addEventListener('resize', reajustar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reajustar);
    if (linea) animar(lista, linea);
  }

  metodo.iniciar = iniciar;
})();
