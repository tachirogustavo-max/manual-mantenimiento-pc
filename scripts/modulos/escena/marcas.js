(function () {
  'use strict';

  const Manual = window.Manual;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;
  const SEPARACION = 26;
  const ANCHO_POR_LETRA = 6.6;

  function franja(marca) {
    const e = ctx.escalaMarcas;
    const caja = ctx.svg.viewBox.baseVal;
    const derecha = caja ? caja.x + caja.width : Infinity;
    const propio = marca.nodo.anchoRotulo || 0;
    const ancho = propio * e;
    const izquierda = marca.x + 18 * e + ancho > derecha - 4;
    return {
      izquierda: izquierda,
      propio: propio,
      desde: izquierda ? marca.x - 30 * e - ancho : marca.x - 12 * e,
      hasta: izquierda ? marca.x + 12 * e : marca.x + 30 * e + ancho
    };
  }

  function alturaLibre(y, f, colocadas, separacion) {
    let resultado = y;
    let movida = true;
    let intentos = 0;
    while (movida && intentos < colocadas.length + 1) {
      movida = false;
      intentos += 1;
      colocadas.forEach(function (otra) {
        if (Math.abs(otra.y - resultado) < separacion && f.hasta > otra.desde && f.desde < otra.hasta) {
          resultado = Math.max(resultado, otra.y + separacion);
          movida = true;
        }
      });
    }
    return resultado;
  }

  function acomodar(marcas) {
    const separacion = SEPARACION * ctx.escalaMarcas;
    const colocadas = [];
    marcas
      .sort(function (a, b) {
        return a.y - b.y;
      })
      .forEach(function (marca) {
        const f = franja(marca);
        const y = alturaLibre(marca.y, f, colocadas, separacion);
        colocadas.push({ y: y, desde: f.desde, hasta: f.hasta });
        marca.nodo.rotulo.setAttribute('transform', f.izquierda ? 'translate(' + -(f.propio + 36) + ' 0)' : '');
        marca.nodo.posicionGlobo.setAttribute(
          'transform',
          'translate(' + marca.x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + ctx.escalaMarcas.toFixed(2) + ')'
        );
      });
  }

  function medirRotulos() {
    Object.keys(ctx.nodos).forEach(function (id) {
      const rotulo = ctx.nodos[id].rotulo;
      const texto = rotulo.querySelector('text');
      let ancho = 0;
      try {
        ancho = texto.getComputedTextLength();
      } catch (error) {
        ancho = texto.textContent.length * ANCHO_POR_LETRA;
      }
      const total = Math.ceil(ancho + 20);
      rotulo.querySelector('rect').setAttribute('width', String(total));
      ctx.nodos[id].anchoRotulo = total;
    });
  }

  function ajustar() {
    const ancho = ctx.svg.getBoundingClientRect().width;
    const caja = ctx.svg.viewBox.baseVal;
    ctx.escalaMarcas = caja && ancho ? Math.max(1, (caja.width / ancho) * 0.95) : 1;
    escena.pintor.pintar();
  }

  escena.marcas = { acomodar: acomodar, medirRotulos: medirRotulos, ajustar: ajustar };
})();
