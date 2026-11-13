(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const perfil = Manual.dominio.perfil;
  const escena = Manual.modulos.escena;

  function marcarTipo() {
    const tipo = escena.tipoVisible();
    dom.$$('[data-tipo]').forEach(function (boton) {
      boton.setAttribute('aria-pressed', boton.getAttribute('data-tipo') === tipo ? 'true' : 'false');
    });
  }

  function elegirTipo(tipo) {
    if (perfil.configurado()) {
      perfil.establecer({ tipo: tipo });
    } else {
      escena.verTipo(tipo);
      marcarTipo();
    }
  }

  function activar() {
    dom.$$('[data-tipo]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        elegirTipo(boton.getAttribute('data-tipo'));
      });
    });
    const desarmar = dom.$('[data-desarmar]');
    if (desarmar) {
      desarmar.addEventListener('click', function () {
        escena.desarme.alternarConBoton();
      });
    }
    perfil.suscribir(marcarTipo);
    marcarTipo();
  }

  escena.controles = { activar: activar };
})();
