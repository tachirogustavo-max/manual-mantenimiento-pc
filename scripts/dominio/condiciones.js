(function () {
  'use strict';

  function coincide(condiciones, perfil) {
    if (!perfil) return true;
    return Object.keys(condiciones).every(function (campo) {
      return condiciones[campo].indexOf(perfil[campo]) !== -1;
    });
  }

  window.Manual.dominio.condiciones = { coincide: coincide };
})();
