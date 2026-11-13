(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const ESPERA_CONFIRMACION = 1600;

  function crearBloque(comando) {
    const texto = [].concat(comando).join('\n');
    const boton = crear('button', { clase: 'comando__copiar', type: 'button', texto: 'Copiar' });
    boton.addEventListener('click', function () {
      Manual.nucleo.portapapeles.copiar(texto).then(function () {
        boton.textContent = 'Copiado';
        window.setTimeout(function () {
          boton.textContent = 'Copiar';
        }, ESPERA_CONFIRMACION);
      }, function () {});
    });
    return crear('div', { clase: 'comando' }, [crear('pre', { tabindex: '0' }, [crear('code', { texto: texto })]), boton]);
  }

  Manual.componentes.comando = { crear: crearBloque };
})();
