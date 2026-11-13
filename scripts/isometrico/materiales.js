(function () {
  'use strict';

  const CATALOGO = {
    marfil: { arriba: '#fff6e7', claro: [236, 220, 196], oscuro: [201, 178, 148], borde: 'rgba(107, 23, 42, 0.55)' },
    beige: { arriba: '#f2e5ce', claro: [226, 207, 178], oscuro: [190, 164, 132], borde: 'rgba(107, 23, 42, 0.5)' },
    oro: { arriba: '#f2c75d', claro: [222, 176, 68], oscuro: [176, 132, 42], borde: 'rgba(107, 23, 42, 0.5)' },
    carmin: { arriba: '#c7283e', claro: [168, 34, 54], oscuro: [124, 25, 42], borde: 'rgba(255, 246, 231, 0.55)' },
    vino: { arriba: '#6b172a', claro: [92, 19, 36], oscuro: [64, 13, 26], borde: 'rgba(255, 246, 231, 0.4)' }
  };

  function obtener(nombre) {
    return CATALOGO[nombre] || CATALOGO.marfil;
  }

  function sombrear(material, luz) {
    const canal = function (i) {
      return Math.round(material.oscuro[i] + (material.claro[i] - material.oscuro[i]) * luz);
    };
    return 'rgb(' + canal(0) + ',' + canal(1) + ',' + canal(2) + ')';
  }

  window.Manual.isometrico.materiales = { obtener: obtener, sombrear: sombrear };
})();
