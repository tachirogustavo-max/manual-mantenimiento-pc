(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const procedimientos = Manual.dominio.procedimientos;
  const tablero = Manual.modulos.tablero;

  const LISTAS = [
    { selector: '#lista-preventivos', datos: 'preventivos' },
    { selector: '#lista-correctivos', datos: 'correctivos' }
  ];

  function pintar(destino, lista) {
    const perfil = Manual.dominio.perfil.vigente();
    const aplicables = lista.filter(function (p) {
      return procedimientos.aplica(p, perfil);
    });
    const otros = lista.filter(function (p) {
      return !procedimientos.aplica(p, perfil);
    });
    destino.className = 'tablero';
    dom.vaciar(destino);
    aplicables.concat(otros).forEach(function (p) {
      destino.appendChild(tablero.tarjeta.construir(p, perfil));
    });
  }

  function pintarTodo() {
    LISTAS.forEach(function (lista) {
      const destino = dom.$(lista.selector);
      if (destino) pintar(destino, Manual.datos[lista.datos]);
    });
  }

  function iniciar() {
    Manual.dominio.perfil.suscribir(pintarTodo);
    Manual.dominio.progreso.suscribir(pintarTodo);
    pintarTodo();
  }

  tablero.iniciar = iniciar;
})();
