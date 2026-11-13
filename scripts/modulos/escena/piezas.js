(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crearSvg = dom.crearSvg;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;
  const PASO_GIRO_TECLADO = 0.18;

  function crearGlobo(pieza, numero) {
    const numeroTexto = crearSvg('text', { 'text-anchor': 'middle', y: '4.5' });
    numeroTexto.textContent = String(numero);
    const nombre = crearSvg('text', { x: '28', y: '4.5' });
    nombre.textContent = pieza.nombre;
    const rotulo = crearSvg('g', { class: 'rotulo' }, [crearSvg('rect', { x: '18', y: '-11', height: '22', rx: '11' }), nombre]);
    const globo = crearSvg('g', { class: 'globo' }, [rotulo, crearSvg('circle', { r: '12' }), numeroTexto]);
    const posicion = crearSvg('g', {}, [globo]);
    posicion.addEventListener('click', function () {
      escena.seleccion.alternar(pieza.id);
    });
    return { globo: globo, rotulo: rotulo, posicion: posicion };
  }

  function alPulsarTecla(pieza, evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      escena.seleccion.alternar(pieza.id);
    } else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowRight') {
      evento.preventDefault();
      ctx.giro += evento.key === 'ArrowLeft' ? -PASO_GIRO_TECLADO : PASO_GIRO_TECLADO;
      escena.pintor.pintar();
      if (document.activeElement !== evento.currentTarget) evento.currentTarget.focus({ preventScroll: true });
    }
  }

  function construir(pieza, numero) {
    const vivo = Manual.isometrico.pieza.crear(pieza);
    const marca = crearGlobo(pieza, numero);
    const movimiento = crearSvg('g', {}, [vivo.grupo]);
    const entrada = crearSvg(
      'g',
      { class: 'pieza', role: 'button', tabindex: '0', 'aria-pressed': 'false', 'data-pieza': pieza.id, 'aria-label': 'Pieza ' + numero + ': ' + pieza.nombre },
      [movimiento]
    );

    entrada.addEventListener('click', function () {
      escena.seleccion.alternar(pieza.id);
    });
    entrada.addEventListener('keydown', function (evento) {
      alPulsarTecla(pieza, evento);
    });

    ctx.nodos[pieza.id] = {
      entrada: entrada,
      globo: marca.globo,
      posicionGlobo: marca.posicion,
      rotulo: marca.rotulo,
      anchoRotulo: 0,
      vivo: vivo,
      centro: Manual.isometrico.medidas.centro3d(pieza)
    };
    return entrada;
  }


  escena.piezas = { construir: construir };
})();
