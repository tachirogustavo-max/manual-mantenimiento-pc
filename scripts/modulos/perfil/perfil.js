(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const modulo = Manual.modulos.perfil;
  const CAMPOS_EN_CHIP = 3;

  let cuerpo = null;
  let superposicion = null;

  function render() {
    dom.vaciar(cuerpo);
    modulo.formulario.construir().forEach(function (bloque) {
      cuerpo.appendChild(bloque);
    });
  }

  function renderConservandoFoco() {
    const foco = document.activeElement;
    const nombre = foco && foco.name ? foco.name : null;
    const valor = foco && foco.value ? foco.value : null;
    const posicion = cuerpo.scrollTop;
    render();
    cuerpo.scrollTop = posicion;
    if (!nombre || !valor) return;
    const sucesor = dom.$('[name="' + nombre + '"][value="' + valor + '"]', cuerpo);
    if (sucesor) sucesor.focus({ preventScroll: true });
  }

  function actualizarChips() {
    const perfil = Manual.dominio.perfil;
    const configurado = perfil.configurado();
    const texto = configurado ? perfil.resumen().slice(0, CAMPOS_EN_CHIP).join(', ') : 'Configúralo aquí';
    dom.$$('[data-chip-perfil]').forEach(function (chip) {
      chip.classList.toggle('chip-perfil--pendiente', !configurado);
      dom.$$('[data-chip-texto]', chip).forEach(function (destino) {
        destino.textContent = texto;
      });
    });
  }

  function abrir() {
    render();
    superposicion.abrir();
  }

  function iniciar() {
    cuerpo = dom.$('#hoja-perfil-cuerpo');
    superposicion = Manual.nucleo.superposicion.crear(dom.$('#hoja-perfil'), {
      enfoqueInicial: function () {
        return dom.$('input:checked', cuerpo) || cuerpo;
      }
    });
    dom.$$('[data-chip-perfil], [data-abrir-perfil]').forEach(function (boton) {
      boton.addEventListener('click', abrir);
    });
    Manual.dominio.perfil.suscribir(function () {
      actualizarChips();
      if (superposicion.estaAbierta()) renderConservandoFoco();
    });
    actualizarChips();
  }

  modulo.iniciar = iniciar;
  modulo.abrir = abrir;
})();
