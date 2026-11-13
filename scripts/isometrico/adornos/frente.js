(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const g = isometrico.geometria;
  const NORMAL = [0, 1];
  const NORMAL_LATERAL = [1, 0];
  isometrico.adornos.frente = function (a) {
    return a.elementos.map(function (e) {
      const vertices = e.r ? g.circuloVertical(e.x, a.y, e.z, e.r) : g.rectanguloFrontal(e.x0, e.z0, e.x1, e.z1, a.y);
      return { forma: 'poligono', vertices: vertices, relleno: e.relleno, trazo: 'none', normal: NORMAL };
    });
  };

  isometrico.adornos.lateral = function (a) {
    const piezas = (a.elementos || []).map(function (e) {
      const vertices = e.r ? g.circuloLateral(a.x, e.y, e.z, e.r) : g.rectanguloLateral(a.x, e.y0, e.z0, e.y1, e.z1);
      return { forma: 'poligono', vertices: vertices, relleno: e.relleno, trazo: e.borde || 'none', normal: NORMAL_LATERAL };
    });
    if (!a.rutas) return piezas;
    const segmentos = a.rutas.map(function (ruta) {
      return ruta.map(function (p) {
        return [a.x, p[0], p[1]];
      });
    });
    return [{ forma: 'trazo', segmentos: segmentos, trazo: a.color || 'rgba(107, 23, 42, 0.55)', ancho: 1, normal: NORMAL_LATERAL }].concat(piezas);
  };
})();
