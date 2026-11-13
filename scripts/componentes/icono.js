(function () {
  'use strict';

  const Manual = window.Manual;
  const crearSvg = Manual.nucleo.dom.crearSvg;

  function capas(nombre) {
    const icono = Manual.datos.iconos[nombre];
    if (!icono) return [];
    const lista = [];
    if (icono.fondo) lista.push(crearSvg('path', { class: 'icono__fondo', d: icono.fondo }));
    lista.push(crearSvg('path', { d: icono.trazo }));
    if (icono.detalle) lista.push(crearSvg('path', { d: icono.detalle.trazo, transform: icono.detalle.transformar }));
    return lista;
  }

  function crear(nombre) {
    if (!Manual.datos.iconos[nombre]) return null;
    return crearSvg('svg', { class: 'icono', viewBox: '0 0 256 256', 'aria-hidden': 'true', focusable: 'false' }, capas(nombre));
  }

  function dibujarMarcados() {
    document.querySelectorAll('svg[data-icono]').forEach(function (svg) {
      svg.setAttribute('viewBox', '0 0 256 256');
      capas(svg.getAttribute('data-icono')).forEach(function (capa) {
        svg.appendChild(capa);
      });
    });
  }

  Manual.componentes.icono = { crear: crear, dibujarMarcados: dibujarMarcados };
})();
