(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;

  let superposicion = null;

  function iniciar() {
    const contenedor = dom.$('#hoja-mas');
    if (!contenedor) return;
    superposicion = Manual.nucleo.superposicion.crear(contenedor);
    dom.$$('[data-abrir-mas]').forEach(function (boton) {
      boton.addEventListener('click', superposicion.abrir);
    });
  }

  function cerrar() {
    if (superposicion) superposicion.cerrar();
  }

  Manual.modulos.navegacion.hojaMas = { iniciar: iniciar, cerrar: cerrar };
})();
