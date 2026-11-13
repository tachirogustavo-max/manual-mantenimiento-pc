(function () {
  'use strict';

  const COS = 0.8660254;
  const SEN = 0.5;

  function acotar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  function crearProyector(centro, angulo) {
    const c = Math.cos(angulo);
    const s = Math.sin(angulo);

    function rotar(dx, dy) {
      return [dx * c - dy * s, dx * s + dy * c];
    }

    return {
      punto: function (x, y, z) {
        const r = rotar(x - centro[0], y - centro[1]);
        return [(r[0] - r[1]) * COS, (r[0] + r[1]) * SEN - z];
      },
      profundidad: function (x, y) {
        const r = rotar(x - centro[0], y - centro[1]);
        return r[0] + r[1];
      },
      normalVisible: function (nx, ny) {
        const r = rotar(nx, ny);
        return r[0] + r[1] > 0.04;
      },
      luz: function (nx, ny) {
        const r = rotar(nx, ny);
        return acotar((r[1] - r[0]) * 0.5 + 0.5, 0, 1);
      }
    };
  }

  function desplazar(proyector, d) {
    if (!d) return proyector;
    return {
      punto: function (x, y, z) {
        return proyector.punto(x + d[0], y + d[1], z + d[2]);
      },
      profundidad: function (x, y) {
        return proyector.profundidad(x + d[0], y + d[1]);
      },
      normalVisible: proyector.normalVisible,
      luz: proyector.luz
    };
  }

  function textoPuntos(proyector, vertices) {
    return vertices
      .map(function (v) {
        const p = proyector.punto(v[0], v[1], v[2]);
        return p[0].toFixed(1) + ',' + p[1].toFixed(1);
      })
      .join(' ');
  }

  function textoTrazo(proyector, segmentos, cerrar) {
    return segmentos
      .map(function (segmento) {
        const tramo = segmento
          .map(function (v, i) {
            const p = proyector.punto(v[0], v[1], v[2]);
            return (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
          })
          .join(' ');
        return tramo + (cerrar ? ' Z' : '');
      })
      .join(' ');
  }

  window.Manual.isometrico.proyeccion = {
    crearProyector: crearProyector,
    desplazar: desplazar,
    textoPuntos: textoPuntos,
    textoTrazo: textoTrazo
  };
})();
