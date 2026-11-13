(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;

  function crearLista(textos, clase) {
    return crear(
      'ul',
      { clase: clase || 'lista-simple' },
      textos.map(function (texto) {
        return crear('li', { texto: texto });
      })
    );
  }

  Manual.componentes.lista = { crear: crearLista };
})();
