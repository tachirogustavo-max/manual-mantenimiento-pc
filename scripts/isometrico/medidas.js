(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const PASO_GRADOS = 15;
  const MARGEN_HUELLA = 6;

  function desplazamientoFinal(pieza) {
    const mover = pieza.mover || [0, 0];
    return [mover[0], mover[1], pieza.elevar];
  }

  function extremos(pieza) {
    return pieza.cajas.reduce(
      function (r, c) {
        return [Math.min(r[0], c.x), Math.min(r[1], c.y), Math.min(r[2], c.z), Math.max(r[3], c.x + c.an), Math.max(r[4], c.y + c.pr), Math.max(r[5], c.z + c.al)];
      },
      [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]
    );
  }

  function centro3d(pieza) {
    const e = extremos(pieza);
    return [(e[0] + e[3]) / 2, (e[1] + e[4]) / 2, (e[2] + e[5]) / 2];
  }

  function centroDe(piezas) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    piezas.forEach(function (pieza) {
      const final = desplazamientoFinal(pieza);
      pieza.cajas.forEach(function (c) {
        [0, 1].forEach(function (t) {
          minX = Math.min(minX, c.x + final[0] * t);
          minY = Math.min(minY, c.y + final[1] * t);
          maxX = Math.max(maxX, c.x + c.an + final[0] * t);
          maxY = Math.max(maxY, c.y + c.pr + final[1] * t);
        });
      });
    });
    return [(minX + maxX) / 2, (minY + maxY) / 2];
  }

  function verticesCaja(c, d) {
    const vertices = [];
    [c.x, c.x + c.an].forEach(function (x) {
      [c.y, c.y + c.pr].forEach(function (y) {
        [c.z, c.z + c.al].forEach(function (z) {
          vertices.push([x + d[0], y + d[1], z + d[2]]);
        });
      });
    });
    return vertices;
  }

  function limites(piezas, centro) {
    const caja = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    for (let grados = 0; grados < 360; grados += PASO_GRADOS) {
      const proyector = isometrico.proyeccion.crearProyector(centro, (grados * Math.PI) / 180);
      piezas.forEach(function (pieza) {
        const final = desplazamientoFinal(pieza);
        pieza.cajas.forEach(function (c) {
          [[0, 0, 0], final].forEach(function (d) {
            verticesCaja(c, d).forEach(function (v) {
              const p = proyector.punto(v[0], v[1], v[2]);
              caja.minX = Math.min(caja.minX, p[0]);
              caja.maxX = Math.max(caja.maxX, p[0]);
              caja.minY = Math.min(caja.minY, p[1]);
              caja.maxY = Math.max(caja.maxY, p[1]);
            });
          });
        });
      });
    }
    return caja;
  }

  function huella(pieza) {
    const c = pieza.cajas[0];
    const m = MARGEN_HUELLA;
    return isometrico.geometria.rectanguloHorizontal(c.x - m, c.y - m, c.x + c.an + m, c.y + c.pr + m, 0);
  }

  isometrico.medidas = {
    desplazamientoFinal: desplazamientoFinal,
    centro3d: centro3d,
    centroDe: centroDe,
    limites: limites,
    huella: huella
  };
})();
