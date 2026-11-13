(function () {
  'use strict';

  const almacen = window.Manual.nucleo.almacen;
  const EVENTO = 'progreso';

  function clave(id) {
    return 'pasos:' + id;
  }

  function avisar(id) {
    document.dispatchEvent(new CustomEvent(EVENTO, { detail: { id: id } }));
  }

  function leer(id) {
    return almacen.leer(clave(id), []);
  }

  function guardar(id, lista) {
    almacen.guardar(clave(id), lista);
    avisar(id);
  }

  function marcar(id, indice, hecho) {
    const lista = leer(id).filter(function (i) {
      return i !== indice;
    });
    if (hecho) lista.push(indice);
    guardar(id, lista);
  }

  function borrar(id) {
    almacen.borrar(clave(id));
    avisar(id);
  }

  function suscribir(oyente) {
    document.addEventListener(EVENTO, function (evento) {
      oyente(evento.detail ? evento.detail.id : null);
    });
  }

  window.Manual.dominio.progreso = { leer: leer, marcar: marcar, borrar: borrar, suscribir: suscribir };
})();
