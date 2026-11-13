(function () {
  'use strict';

  const dom = window.Manual.nucleo.dom;
  const abiertas = [];
  const ESPERA_FOCO = 60;
  const SELECTOR_ENFOCABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';

  function actualizarBloqueo() {
    document.documentElement.classList.toggle('bloqueado', abiertas.length > 0);
  }

  function superior() {
    return abiertas[abiertas.length - 1] || null;
  }

  function crear(contenedor, opciones) {
    const config = opciones || {};
    let elementoPrevio = null;
    let esperaFoco = null;

    const api = {
      elemento: contenedor,

      estaAbierta: function () {
        return abiertas.indexOf(api) !== -1;
      },

      esSuperior: function () {
        return superior() === api;
      },

      abrir: function () {
        if (api.estaAbierta()) return;
        elementoPrevio = document.activeElement;
        abiertas.push(api);
        contenedor.classList.add('superposicion--abierta');
        contenedor.setAttribute('aria-hidden', 'false');
        actualizarBloqueo();
        const inicial = config.enfoqueInicial ? config.enfoqueInicial() : null;
        esperaFoco = window.setTimeout(function () {
          (inicial || contenedor).focus({ preventScroll: true });
        }, ESPERA_FOCO);
      },

      cerrar: function () {
        const posicion = abiertas.indexOf(api);
        if (posicion === -1) return;
        window.clearTimeout(esperaFoco);
        abiertas.splice(posicion, 1);
        contenedor.classList.remove('superposicion--abierta');
        contenedor.setAttribute('aria-hidden', 'true');
        actualizarBloqueo();
        if (elementoPrevio && elementoPrevio.focus && document.body.contains(elementoPrevio)) {
          elementoPrevio.focus({ preventScroll: true });
        } else if (superior()) {
          superior().enfocar();
        }
        if (config.alCerrar) config.alCerrar();
      },

      enfocar: function () {
        (config.enfoqueInicial ? config.enfoqueInicial() : contenedor).focus({ preventScroll: true });
      },

      pedirCierre: function () {
        if (config.pedirCierre) config.pedirCierre();
        else api.cerrar();
      }
    };

    contenedor.setAttribute('aria-hidden', 'true');
    contenedor.addEventListener('click', function (evento) {
      if (evento.target.closest('[data-cerrar]')) api.pedirCierre();
    });

    return api;
  }

  function atraparFoco(evento, panel) {
    const enfocables = dom.$$(SELECTOR_ENFOCABLE, panel.elemento).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!enfocables.length) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    const dentro = enfocables.indexOf(document.activeElement) !== -1;
    if (evento.shiftKey && (!dentro || document.activeElement === primero)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && (!dentro || document.activeElement === ultimo)) {
      evento.preventDefault();
      primero.focus();
    }
  }

  document.addEventListener('keydown', function (evento) {
    const panel = superior();
    if (!panel) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      panel.pedirCierre();
    } else if (evento.key === 'Tab') {
      atraparFoco(evento, panel);
    }
  });

  window.Manual.nucleo.superposicion = {
    crear: crear,
    hayAbierta: function () {
      return abiertas.length > 0;
    }
  };
})();
