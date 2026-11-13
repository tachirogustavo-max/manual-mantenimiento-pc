(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;

  function elemento(f) {
    return crear('li', {}, [
      crear('span', { clase: 'mono citas__id', texto: f.id }),
      crear('span', { clase: 'fuentes__detalle' }, [
        crear('a', { href: f.url, target: '_blank', rel: 'noopener', texto: f.titulo }),
        crear('span', { clase: 'fuentes__autor', texto: f.autor })
      ])
    ]);
  }

  function grupo(nombre, lista) {
    return crear('details', { clase: 'fuentes__grupo' }, [
      crear('summary', {}, [crear('span', { clase: 'fuentes__tema', texto: nombre }), crear('span', { clase: 'fuentes__cantidad mono', texto: String(lista.length) })]),
      crear('ul', { clase: 'fuentes__items' }, lista.map(elemento))
    ]);
  }

  function iniciar() {
    const destino = dom.$('#fuentes-lista');
    if (!destino) return;
    const datos = Manual.datos.fuentes;
    Object.keys(datos.temas).forEach(function (tema) {
      const lista = datos.lista.filter(function (f) {
        return f.tema === tema;
      });
      if (lista.length) destino.appendChild(grupo(datos.temas[tema], lista));
    });
  }

  Manual.modulos.fuentes.iniciar = iniciar;
})();
