(function () {
  'use strict';

  const Manual = window.Manual;

  function iniciar() {
    const barra = Manual.nucleo.dom.$('#progreso-lectura');
    if (!barra) return;
    Manual.nucleo.desplazamiento.alDesplazar(function () {
      const maximo = document.documentElement.scrollHeight - window.innerHeight;
      const avance = maximo > 0 ? Math.min(window.scrollY / maximo, 1) : 0;
      barra.style.transform = 'scaleX(' + avance + ')';
    });
  }

  Manual.modulos.navegacion.progresoLectura = { iniciar: iniciar };
})();
