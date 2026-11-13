(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;

  function textoCelda(celda) {
    return typeof celda === 'number' ? String(celda).replace('.', ',') : String(celda);
  }

  function claseCelda(celda, indice, opciones) {
    if (indice === 0 && opciones.primeraMono) return 'mono';
    if (typeof celda === 'number' && opciones.numerica) return 'mono';
    return null;
  }

  function celda(valor, indice, columnas, opciones) {
    const encabezado = indice === 0 && opciones.encabezadoFila;
    return crear(encabezado ? 'th' : 'td', {
      scope: encabezado ? 'row' : null,
      clase: claseCelda(valor, indice, opciones),
      'data-etiqueta': columnas[indice],
      texto: textoCelda(valor)
    });
  }

  function crearTabla(datos, opciones) {
    const config = opciones || {};
    return crear('div', { clase: 'tabla-envoltura', tabindex: '0', role: 'region', 'aria-label': 'Tabla de referencia' }, [
      crear('table', { clase: 'tabla' }, [
        crear('thead', {}, [
          crear(
            'tr',
            {},
            datos.columnas.map(function (c) {
              return crear('th', { scope: 'col', texto: c });
            })
          )
        ]),
        crear(
          'tbody',
          {},
          datos.filas.map(function (fila) {
            return crear(
              'tr',
              {},
              fila.map(function (valor, i) {
                return celda(valor, i, datos.columnas, config);
              })
            );
          })
        )
      ])
    ]);
  }

  Manual.componentes.tabla = { crear: crearTabla };
})();
