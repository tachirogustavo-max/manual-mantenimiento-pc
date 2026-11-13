(function () {
  'use strict';

  const Manual = window.Manual;
  const m = Manual.modulos;

  const SECUENCIA = [
    m.navegacion.hojaMas.iniciar,
    m.navegacion.enlaces.iniciar,
    m.navegacion.seccionActiva.iniciar,
    m.navegacion.progresoLectura.iniciar,
    m.ficha.iniciar,
    m.modoPaso.iniciar,
    m.perfil.iniciar,
    m.escena.iniciar,
    m.diagnostico.iniciar,
    m.tablero.iniciar,
    m.herramientas.iniciar,
    m.metodo.iniciar,
    m.fuentes.iniciar,
    m.busqueda.iniciar
  ];

  function ejecutar(iniciar) {
    try {
      iniciar();
    } catch (error) {
      if (window.console) window.console.error(error);
    }
  }

  Manual.nucleo.sinConexion.registrar();
  ejecutar(Manual.componentes.icono.dibujarMarcados);
  SECUENCIA.forEach(ejecutar);
  m.ficha.abrirDesdeHash();
  m.navegacion.enlaces.irAlAnclaInicial();
})();
