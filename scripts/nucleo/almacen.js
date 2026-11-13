(function () {
  'use strict';

  const PREFIJO = 'manualpc:';

  function leer(clave, porDefecto) {
    try {
      const valor = window.localStorage.getItem(PREFIJO + clave);
      return valor === null ? porDefecto : JSON.parse(valor);
    } catch (error) {
      return porDefecto;
    }
  }

  function guardar(clave, valor) {
    try {
      window.localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
    } catch (error) {
      return;
    }
  }

  function borrar(clave) {
    try {
      window.localStorage.removeItem(PREFIJO + clave);
    } catch (error) {
      return;
    }
  }

  window.Manual.nucleo.almacen = { leer: leer, guardar: guardar, borrar: borrar };
})();
