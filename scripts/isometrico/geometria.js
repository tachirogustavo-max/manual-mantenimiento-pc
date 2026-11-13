(function () {
  'use strict';

  const PASOS_CIRCULO = 28;
  const CANTIDAD_ASPAS = 9;

  function circuloHorizontal(cx, cy, z, r) {
    const vertices = [];
    for (let i = 0; i < PASOS_CIRCULO; i += 1) {
      const angulo = (i / PASOS_CIRCULO) * Math.PI * 2;
      vertices.push([cx + r * Math.cos(angulo), cy + r * Math.sin(angulo), z]);
    }
    return vertices;
  }

  function circuloVertical(cx, y, cz, r) {
    const vertices = [];
    for (let i = 0; i < PASOS_CIRCULO; i += 1) {
      const angulo = (i / PASOS_CIRCULO) * Math.PI * 2;
      vertices.push([cx + r * Math.cos(angulo), y, cz + r * Math.sin(angulo)]);
    }
    return vertices;
  }

  function circuloLateral(x, cy, cz, r) {
    const vertices = [];
    for (let i = 0; i < PASOS_CIRCULO; i += 1) {
      const angulo = (i / PASOS_CIRCULO) * Math.PI * 2;
      vertices.push([x, cy + r * Math.cos(angulo), cz + r * Math.sin(angulo)]);
    }
    return vertices;
  }

  function rectanguloLateral(x, y0, z0, y1, z1) {
    return [[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]];
  }

  function rectanguloHorizontal(x0, y0, x1, y1, z) {
    return [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]];
  }

  function rectanguloFrontal(x0, z0, x1, z1, y) {
    return [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]];
  }

  function aspas(centro, radio, esVertical) {
    const segmentos = [];
    for (let i = 0; i < CANTIDAD_ASPAS; i += 1) {
      const angulo = (i / CANTIDAD_ASPAS) * Math.PI * 2;
      const puntos = [];
      for (let k = 0; k <= 4; k += 1) {
        const t = k / 4;
        const r = radio * (0.28 + 0.62 * t);
        const a = angulo + t * 0.75;
        if (esVertical) puntos.push([centro[0] + r * Math.cos(a), centro[1], centro[2] + r * Math.sin(a)]);
        else puntos.push([centro[0] + r * Math.cos(a), centro[1] + r * Math.sin(a), centro[2]]);
      }
      segmentos.push(puntos);
    }
    return segmentos;
  }

  window.Manual.isometrico.geometria = {
    circuloHorizontal: circuloHorizontal,
    circuloVertical: circuloVertical,
    circuloLateral: circuloLateral,
    rectanguloLateral: rectanguloLateral,
    rectanguloHorizontal: rectanguloHorizontal,
    rectanguloFrontal: rectanguloFrontal,
    aspas: aspas
  };
})();
