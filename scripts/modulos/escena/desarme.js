(function () {
  'use strict';

  const Manual = window.Manual;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;

  let lineaTiempo = null;

  function finDelRecorrido() {
    return ctx.seccion.offsetTop + ctx.seccion.offsetHeight - window.innerHeight;
  }

  function detener() {
    if (!lineaTiempo) return;
    if (lineaTiempo.scrollTrigger) lineaTiempo.scrollTrigger.kill();
    lineaTiempo.kill();
    lineaTiempo = null;
  }

  function mostrarDesarmado() {
    ctx.piezas.forEach(function (pieza) {
      ctx.progresos[pieza.id].v = 1;
    });
    escena.pintor.pintar();
  }

  function rotularBoton(progreso) {
    const boton = Manual.nucleo.dom.$('[data-desarmar]');
    const texto = progreso > 0.5 ? 'Armar' : 'Desarmar';
    if (boton && boton.textContent !== texto) boton.textContent = texto;
  }

  function vincularAlScroll() {
    const gsap = window.gsap;
    const ordenadas = escena.ordenadasPorAltura();
    const globos = ordenadas.map(function (p) {
      return ctx.nodos[p.id].globo;
    });

    gsap.set(globos, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });

    lineaTiempo = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: ctx.seccion,
        start: function () {
          return ctx.seccion.offsetTop;
        },
        end: finDelRecorrido,
        scrub: 0.7,
        invalidateOnRefresh: true,
        onUpdate: function (disparador) {
          rotularBoton(disparador.progress);
        }
      },
      onUpdate: escena.pintor.solicitar
    });

    ordenadas.forEach(function (pieza, i) {
      lineaTiempo.to(ctx.progresos[pieza.id], { v: 1, duration: 1 }, i * 0.1);
    });
    lineaTiempo.to(globos, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '>-0.5');
    lineaTiempo.to({}, { duration: 0.7 });
    window.ScrollTrigger.refresh();
  }

  function entrada() {
    const entradas = escena.ordenadasPorAltura().map(function (p) {
      return ctx.nodos[p.id].entrada;
    });
    window.gsap.from(entradas, { y: -110, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'opacity,transform' });
    window.gsap.from('.huella', { opacity: 0, duration: 1.2, ease: 'none' });
  }

  function alternarConBoton() {
    const armando = lineaTiempo && lineaTiempo.scrollTrigger && lineaTiempo.scrollTrigger.progress > 0.5;
    window.scrollTo({ top: armando ? ctx.seccion.offsetTop : finDelRecorrido(), behavior: ctx.sinMovimiento ? 'auto' : 'smooth' });
  }

  escena.desarme = {
    detener: detener,
    mostrarDesarmado: mostrarDesarmado,
    vincularAlScroll: vincularAlScroll,
    entrada: entrada,
    alternarConBoton: alternarConBoton
  };
})();
