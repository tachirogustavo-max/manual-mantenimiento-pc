(function () {
  'use strict';

  const Manual = window.Manual;

  function crear(riesgo) {
    return Manual.nucleo.dom.crear('span', {
      clase: 'sello sello--' + riesgo,
      texto: Manual.dominio.procedimientos.etiquetaRiesgo(riesgo)
    });
  }

  Manual.componentes.sello = { crear: crear };
})();
