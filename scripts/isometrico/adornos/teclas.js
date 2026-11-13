(function () {
  'use strict';

  const isometrico = window.Manual.isometrico;
  const rectangulo = isometrico.geometria.rectanguloHorizontal;
  const MARGEN = 1.7;
  const TECLAS_LATERALES = 4;

  isometrico.adornos.teclas = function (a) {
    const ancho = a.an / a.columnas;
    const alto = a.pr / a.filas;
    const tecla = function (desde, hasta, fila) {
      return rectangulo(a.x + desde * ancho + MARGEN, a.y + fila * alto + MARGEN, a.x + hasta * ancho - MARGEN, a.y + (fila + 1) * alto - MARGEN, a.z);
    };
    const segmentos = [];
    for (let fila = 0; fila < a.filas; fila += 1) {
      const ultima = fila === a.filas - 1;
      for (let col = 0; col < a.columnas; col += 1) {
        const enEspaciadora = ultima && col >= TECLAS_LATERALES && col < a.columnas - TECLAS_LATERALES;
        if (!enEspaciadora) segmentos.push(tecla(col, col + 1, fila));
        else if (col === TECLAS_LATERALES) segmentos.push(tecla(TECLAS_LATERALES, a.columnas - TECLAS_LATERALES, fila));
      }
    }
    return [{ forma: 'relleno', segmentos: segmentos, relleno: a.color || '#6b172a', trazo: 'none' }];
  };
})();
