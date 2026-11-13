(function () {
  'use strict';

  function copiarConArea(texto) {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('aria-hidden', 'true');
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand('copy') ? Promise.resolve() : Promise.reject(new Error('copia'));
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(area);
    }
  }

  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).catch(function () {
        return copiarConArea(texto);
      });
    }
    return copiarConArea(texto);
  }

  window.Manual.nucleo.portapapeles = { copiar: copiar };
})();
