(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const g = isometrico.geometria;

  function construir(a, vertical) {
    const normal = vertical ? [0, 1] : null;
    const circulo = function (radio) {
      return vertical ? g.circuloVertical(a.cx, a.y, a.cz, radio) : g.circuloHorizontal(a.cx, a.cy, a.z, radio);
    };
    const centro = vertical ? [a.cx, a.y, a.cz] : [a.cx, a.cy, a.z];
    const color = a.aspas || '#fff6e7';
    return [
      { forma: 'poligono', vertices: circulo(a.r), relleno: a.relleno || '#6b172a', trazo: 'rgba(255, 246, 231, 0.5)', normal: normal },
      { forma: 'trazo', segmentos: g.aspas(centro, a.r, vertical), trazo: color, ancho: 1.1, normal: normal },
      { forma: 'poligono', vertices: circulo(a.r * 0.24), relleno: color, trazo: 'none', normal: normal }
    ];
  }

  isometrico.adornos.ventilador = function (a) {
    return construir(a, false);
  };

  isometrico.adornos.ventiladorLateral = function (a) {
    return construir(a, true);
  };
})();
