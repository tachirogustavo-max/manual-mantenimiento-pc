(function () {
  'use strict';

  const Manual = window.Manual;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;

  function activar() {
    ctx.svg.addEventListener('click', (evento) => {
      if (!ctx.seleccionada || evento.target.closest('.pieza, .capa-marcas')) return;
      escena.seleccion.limpiar();
    });
  }

  escena.giro = { activar: activar };
})();
