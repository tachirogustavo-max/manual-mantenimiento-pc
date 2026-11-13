(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const referencias = Manual.datos.referencias;
  const herramientas = Manual.modulos.herramientas;

  function tablaConNota(selector, datos, numerica) {
    const destino = dom.$(selector);
    if (!destino) return;
    destino.appendChild(Manual.componentes.tabla.crear(datos, { encabezadoFila: true, numerica: numerica }));
    if (datos.nota) destino.appendChild(dom.crear('p', { clase: 'instrumento__nota', texto: datos.nota }));
  }

  function iniciar() {
    const firmware = dom.$('#instrumento-firmware');
    if (firmware) herramientas.firmware.construir(firmware);
    tablaConNota('#instrumento-temperaturas', referencias.limitesTemperatura, false);
    tablaConNota('#instrumento-tensiones', referencias.tensionesAtx, true);
  }

  herramientas.iniciar = iniciar;
})();
