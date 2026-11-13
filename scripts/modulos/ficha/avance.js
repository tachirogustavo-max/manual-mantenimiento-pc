(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;

  function actualizar(procedimiento) {
    const barra = dom.$('#ficha-barra');
    const avance = Manual.dominio.procedimientos.avance(procedimiento, Manual.dominio.perfil.vigente());
    const texto = avance.completados + ' de ' + avance.total + ' pasos';
    barra.firstElementChild.style.transform = 'scaleX(' + avance.porcentaje / 100 + ')';
    barra.setAttribute('aria-valuenow', String(avance.porcentaje));
    barra.setAttribute('aria-valuetext', texto);
    const etiqueta = dom.$('#ficha-avance');
    if (etiqueta) etiqueta.textContent = texto;
  }

  Manual.modulos.ficha.avance = { actualizar: actualizar };
})();
