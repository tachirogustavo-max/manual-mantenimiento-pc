(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const g = isometrico.geometria;

  isometrico.adornos.cuadro = function (a) {
    const m = a.margen || 0;
    return [
      {
        forma: 'poligono',
        vertices: g.rectanguloHorizontal(a.x + m, a.y + m, a.x + a.an - m, a.y + a.pr - m, a.z),
        relleno: a.relleno || 'none',
        trazo: a.borde || 'rgba(107, 23, 42, 0.5)'
      }
    ];
  };

  isometrico.adornos.lineas = function (a) {
    const segmentos = [];
    for (let i = 1; i < a.n; i += 1) {
      const t = i / a.n;
      if (a.eje === 'x') {
        const x = a.desde[0] + (a.hasta[0] - a.desde[0]) * t;
        segmentos.push([[x, a.desde[1], a.z], [x, a.hasta[1], a.z]]);
      } else {
        const y = a.desde[1] + (a.hasta[1] - a.desde[1]) * t;
        segmentos.push([[a.desde[0], y, a.z], [a.hasta[0], y, a.z]]);
      }
    }
    return [{ forma: 'trazo', segmentos: segmentos, trazo: a.color || 'rgba(107, 23, 42, 0.45)', ancho: a.ancho || 1 }];
  };

  isometrico.adornos.trazas = function (a) {
    const segmentos = a.rutas.map(function (ruta) {
      return ruta.map(function (p) {
        return [p[0], p[1], a.z];
      });
    });
    return [{ forma: 'trazo', segmentos: segmentos, trazo: a.color || 'rgba(107, 23, 42, 0.55)', ancho: 1 }];
  };

  isometrico.adornos.puntos = function (a) {
    return a.puntos.map(function (p) {
      return { forma: 'poligono', vertices: g.circuloHorizontal(p[0], p[1], a.z, a.r || 3.2), relleno: a.relleno || '#6b172a', trazo: 'none' };
    });
  };
})();
