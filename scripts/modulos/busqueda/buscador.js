(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const busqueda = Manual.modulos.busqueda;
  const ESPERA_CIERRE = 220;

  let indice = [];
  let encontrados = [];
  let seleccion = 0;
  let elementos = null;
  let superposicion = null;

  function buscarSugerencia(texto) {
    elementos.entrada.value = texto;
    render();
    elementos.entrada.focus();
  }

  function sugerencias() {
    const botones = Manual.datos.busqueda.sugerencias.map((texto) =>
      crear('button', {
        clase: 'buscador__sugerencia',
        type: 'button',
        texto: texto,
        en: { click: () => buscarSugerencia(texto) }
      })
    );
    return crear('div', { clase: 'buscador__vacio' }, [crear('span', { texto: 'Prueba con:' }), crear('span', { clase: 'buscador__sugerencias' }, botones)]);
  }

  function opcion(item, i, consulta) {
    return crear(
      'li',
      {
        clase: 'resultado-busqueda',
        role: 'option',
        id: `resultado-${i}`,
        'aria-selected': i === 0 ? 'true' : 'false',
        en: { click: () => elegir(i) }
      },
      [
        crear('span', { clase: 'resultado-busqueda__tipo' }, [item.codigo ? crear('span', { clase: 'mono', texto: `${item.codigo} ` }) : null, item.tipo]),
        crear('span', { clase: 'resultado-busqueda__titulo', texto: item.titulo }),
        crear('span', { clase: 'resultado-busqueda__texto', texto: busqueda.indice.fragmento(item, consulta) })
      ]
    );
  }

  function render() {
    const consulta = elementos.entrada.value.trim();
    encontrados = busqueda.indice.buscar(indice, consulta);
    seleccion = 0;
    dom.vaciar(elementos.resultados);
    dom.vaciar(elementos.mensaje);
    if (!consulta) {
      elementos.mensaje.appendChild(sugerencias());
    } else if (!encontrados.length) {
      elementos.mensaje.appendChild(crear('p', { clase: 'buscador__vacio', texto: `Sin resultados para "${consulta}". Prueba con otra palabra.` }));
    } else {
      encontrados.forEach((item, i) => elementos.resultados.appendChild(opcion(item, i, consulta)));
    }
    elementos.entrada.setAttribute('aria-expanded', encontrados.length ? 'true' : 'false');
    actualizarActivo();
  }

  function actualizarActivo() {
    if (encontrados.length) elementos.entrada.setAttribute('aria-activedescendant', 'resultado-' + seleccion);
    else elementos.entrada.removeAttribute('aria-activedescendant');
  }

  function marcar() {
    actualizarActivo();
    dom.$$('.resultado-busqueda', elementos.resultados).forEach(function (el, i) {
      el.setAttribute('aria-selected', i === seleccion ? 'true' : 'false');
      if (i === seleccion) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function ir(destino) {
    if (destino.ficha) Manual.modulos.ficha.abrir(destino.ficha);
    else Manual.nucleo.desplazamiento.irA(destino.seccion);
  }

  function elegir(i) {
    const item = encontrados[i];
    if (!item) return;
    superposicion.cerrar();
    window.setTimeout(function () {
      ir(item.destino);
    }, ESPERA_CIERRE);
  }

  function alTeclear(evento) {
    if (!encontrados.length && evento.key !== 'Enter') return;
    if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      seleccion = Math.min(seleccion + 1, encontrados.length - 1);
      marcar();
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      seleccion = Math.max(seleccion - 1, 0);
      marcar();
    } else if (evento.key === 'Enter') {
      evento.preventDefault();
      elegir(seleccion);
    }
  }

  function abrir() {
    if (!indice.length) indice = busqueda.indice.construir();
    elementos.entrada.value = '';
    render();
    superposicion.abrir();
  }

  function atajoGlobal(evento) {
    const comando = (evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === 'k';
    const barra = evento.key === '/' && !evento.target.closest('input, textarea, [contenteditable]');
    if ((comando || barra) && !Manual.nucleo.superposicion.hayAbierta()) {
      evento.preventDefault();
      abrir();
    }
  }

  function iniciar() {
    elementos = { entrada: dom.$('#buscador-entrada'), resultados: dom.$('#buscador-resultados'), mensaje: dom.$('#buscador-mensaje') };
    superposicion = Manual.nucleo.superposicion.crear(dom.$('#buscador'), {
      enfoqueInicial: function () {
        return elementos.entrada;
      }
    });
    elementos.entrada.addEventListener('input', render);
    elementos.entrada.addEventListener('keydown', alTeclear);
    dom.$$('[data-abrir-busqueda]').forEach(function (boton) {
      boton.addEventListener('click', abrir);
    });
    document.addEventListener('keydown', atajoGlobal);
  }

  busqueda.iniciar = iniciar;
})();
