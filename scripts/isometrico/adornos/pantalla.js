(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const rectangulo = isometrico.geometria.rectanguloFrontal;
  const NORMAL = [0, 1];
  const BORDE = 'rgba(255, 246, 231, 0.35)';

  function medidas(a) {
    const ancho = a.x1 - a.x0;
    const alto = a.z1 - a.z0;
    return {
      marco: rectangulo(a.x0, a.z0, a.x1, a.z1, a.y),
      fila: function (desde, hasta, z) {
        return [[a.x0 + ancho * desde, a.y, a.z0 + alto * z], [a.x0 + ancho * hasta, a.y, a.z0 + alto * z]];
      },
      bloque: function (x0, z0, x1, z1) {
        return rectangulo(a.x0 + ancho * x0, a.z0 + alto * z0, a.x0 + ancho * x1, a.z0 + alto * z1, a.y);
      }
    };
  }

  function texto(segmentos, color, ancho) {
    return { forma: 'trazo', segmentos: segmentos, trazo: color, ancho: ancho, normal: NORMAL };
  }

  function fondo(vertices, relleno, trazo) {
    return { forma: 'poligono', vertices: vertices, relleno: relleno, trazo: trazo || 'none', normal: NORMAL };
  }

  function contenido(m) {
    return [
      fondo(m.marco, '#3d0c18', BORDE),
      texto([m.fila(0.08, 0.5, 0.78), m.fila(0.08, 0.36, 0.64), m.fila(0.08, 0.42, 0.56)], '#fff6e7', 2.4),
      texto([m.fila(0.08, 0.3, 0.32), m.fila(0.08, 0.3, 0.24)], '#f2c75d', 2.4),
      fondo(m.bloque(0.56, 0.18, 0.92, 0.82), '#c7283e')
    ];
  }

  isometrico.adornos.pantalla = function (a) {
    return contenido(medidas(a));
  };
})();
