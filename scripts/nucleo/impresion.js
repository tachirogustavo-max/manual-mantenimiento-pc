(function () {
  'use strict';

  function imprimir(modo) {
    const clase = 'imprimiendo-' + modo;
    const cerrados = Array.prototype.filter.call(document.querySelectorAll('#' + modo + ' details'), function (plegable) {
      return !plegable.open;
    });
    function limpiar() {
      document.body.classList.remove(clase);
      cerrados.forEach(function (plegable) {
        plegable.open = false;
      });
      window.removeEventListener('afterprint', limpiar);
    }
    cerrados.forEach(function (plegable) {
      plegable.open = true;
    });
    document.body.classList.add(clase);
    window.addEventListener('afterprint', limpiar);
    window.print();
  }

  window.Manual.nucleo.impresion = { imprimir: imprimir };
})();
