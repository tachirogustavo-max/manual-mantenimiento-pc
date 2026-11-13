(function () {
  'use strict';

  const Manual = window.Manual;
  const isometrico = Manual.isometrico;
  const crearSvg = Manual.nucleo.dom.crearSvg;
  const desplazar = isometrico.proyeccion.desplazar;

  function cajaMasAlta(pieza) {
    return pieza.cajas.reduce(function (mejor, c) {
      return c.z + c.al > mejor.z + mejor.al ? c : mejor;
    }, pieza.cajas[0]);
  }

  function anclajeAutomatico(alta, proyector) {
    const z = alta.z + alta.al;
    const esquinas = [
      [alta.x, alta.y],
      [alta.x + alta.an, alta.y],
      [alta.x + alta.an, alta.y + alta.pr],
      [alta.x, alta.y + alta.pr]
    ].map(function (e) {
      return proyector.punto(e[0], e[1], z);
    });
    const derecha = esquinas.reduce(function (mejor, e) {
      return e[0] > mejor[0] ? e : mejor;
    }, esquinas[0]);
    return [derecha[0] + 14, derecha[1] - 12];
  }

  function crear(pieza) {
    const grupo = crearSvg('g', {});
    const contenedorCajas = crearSvg('g', {});
    grupo.appendChild(contenedorCajas);

    const cajas = pieza.cajas.map(function (c) {
      return isometrico.caja.crear(c, pieza.material);
    });
    cajas.forEach(function (caja) {
      contenedorCajas.appendChild(caja.grupo);
    });

    const primitivas = [];
    (pieza.adornos || []).forEach(function (adorno) {
      const soporte = cajas[adorno.caja || 0];
      isometrico.primitiva.desdeAdorno(adorno).forEach(function (datos) {
        const primitiva = isometrico.primitiva.crear(datos);
        soporte.grupo.appendChild(primitiva.nodo);
        primitivas.push(primitiva);
      });
    });

    const alta = cajaMasAlta(pieza);
    let ordenPrevio = '';

    function ordenarCajas(proyector) {
      const orden = cajas.slice().sort(function (a, b) {
        if (a.z !== b.z) return a.z - b.z;
        return proyector.profundidad(a.centro[0], a.centro[1]) - proyector.profundidad(b.centro[0], b.centro[1]);
      });
      const clave = orden
        .map(function (caja) {
          return cajas.indexOf(caja);
        })
        .join(',');
      if (clave === ordenPrevio) return;
      orden.forEach(function (caja) {
        contenedorCajas.appendChild(caja.grupo);
      });
      ordenPrevio = clave;
    }

    return {
      grupo: grupo,

      actualizar: function (proyectorBase, desplazamiento) {
        const proyector = desplazar(proyectorBase, desplazamiento);
        ordenarCajas(proyector);
        cajas.forEach(function (caja) {
          caja.pintar(proyector);
        });
        primitivas.forEach(function (primitiva) {
          primitiva.pintar(proyector);
        });
      },

      anclaje: function (proyectorBase, desplazamiento) {
        const proyector = desplazar(proyectorBase, desplazamiento);
        if (!pieza.globo) return anclajeAutomatico(alta, proyector);
        const p = pieza.globo.punto;
        const fijo = proyector.punto(p[0], p[1], p[2]);
        return [fijo[0] + pieza.globo.dx, fijo[1] + pieza.globo.dy];
      }
    };
  }

  isometrico.pieza = { crear: crear };
})();
