(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;

  function buscar(id) {
    return Manual.datos.fuentes.lista.find((f) => f.id === id);
  }

  function crearLista(ids) {
    return crear(
      'ul',
      { clase: 'citas' },
      (ids || [])
        .map(buscar)
        .filter(Boolean)
        .map(function (f) {
          return crear('li', {}, [
            crear('span', { clase: 'mono citas__id', texto: f.id }),
            crear('a', { href: f.url, target: '_blank', rel: 'noopener', texto: f.autor + ': ' + f.titulo })
          ]);
        })
    );
  }

  Manual.componentes.citas = { crear: crearLista };
})();
