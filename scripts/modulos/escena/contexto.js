(function () {
  'use strict';

  const Manual = window.Manual;

  Object.assign(Manual.modulos.escena, {
    constantes: {
      FACTOR_EXPLOSION: 0.74,
      MARGEN_VISTA: 28
    },

    contexto: {
      svg: null,
      detalle: null,
      seccion: null,
      sinMovimiento: false,
      piezas: [],
      nodos: {},
      progresos: {},
      centro: [0, 0],
      giro: 0,
      seleccionada: null,
      escalaMarcas: 1,
      nodoHuella: null,
      capaMarcas: null
    },

    ordenadasPorAltura: function () {
      return this.contexto.piezas.slice().sort(function (a, b) {
        return a.elevar - b.elevar;
      });
    }
  });
})();
