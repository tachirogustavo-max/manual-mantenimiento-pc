(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const referencias = Manual.datos.referencias;

  function bloque(etiqueta, valor) {
    return crear('div', { clase: 'lectura__bloque' }, [
      crear('span', { clase: 'lectura__etiqueta', texto: etiqueta }),
      crear('span', { clase: 'lectura__valor', texto: valor })
    ]);
  }

  function construir(destino) {
    const selector = crear('div', { clase: 'selector-fabricante', role: 'group', 'aria-label': 'Fabricante' });
    const lectura = crear('div', { clase: 'lectura', 'aria-live': 'polite' });

    function mostrar(indice) {
      const dato = referencias.teclasFirmware[indice];
      dom.vaciar(lectura);
      lectura.appendChild(crear('div', { clase: 'lectura__teclas' }, [bloque('Configuración del firmware', dato.configuracion), bloque('Menú de arranque', dato.menuArranque)]));
      if (dato.nota) lectura.appendChild(crear('p', { clase: 'lectura__nota', texto: dato.nota }));
      dom.$$('button', selector).forEach(function (b, i) {
        b.setAttribute('aria-pressed', i === indice ? 'true' : 'false');
      });
    }

    referencias.teclasFirmware.forEach(function (dato, i) {
      selector.appendChild(
        crear('button', {
          type: 'button',
          clase: 'selector',
          texto: dato.fabricante,
          en: {
            click: function () {
              mostrar(i);
            }
          }
        })
      );
    });

    destino.appendChild(selector);
    destino.appendChild(lectura);
    destino.appendChild(crear('p', { clase: 'instrumento__nota', texto: referencias.rutaWindowsFirmware }));
    mostrar(0);
  }

  Manual.modulos.herramientas.firmware = { construir: construir };
})();
