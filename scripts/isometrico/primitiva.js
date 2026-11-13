(function () {
  'use strict';

  const Manual = window.Manual;
  const isometrico = Manual.isometrico;
  const proyeccion = isometrico.proyeccion;

  function desdeAdorno(adorno) {
    const construir = isometrico.adornos[adorno.tipo] || isometrico.adornos.puntos;
    return construir(adorno);
  }

  function crear(datos) {
    const nodo = Manual.nucleo.dom.crearSvg(datos.forma === 'poligono' ? 'polygon' : 'path', {
      class: 'adorno',
      fill: datos.forma === 'trazo' ? 'none' : datos.relleno || 'none',
      stroke: datos.trazo || 'none',
      'stroke-width': String(datos.ancho || 1),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    return {
      nodo: nodo,
      pintar: function (proyector) {
        if (datos.normal) {
          const visible = proyector.normalVisible(datos.normal[0], datos.normal[1]);
          nodo.style.display = visible ? '' : 'none';
          if (!visible) return;
        }
        if (datos.forma === 'poligono') nodo.setAttribute('points', proyeccion.textoPuntos(proyector, datos.vertices));
        else nodo.setAttribute('d', proyeccion.textoTrazo(proyector, datos.segmentos, datos.forma === 'relleno'));
      }
    };
  }

  isometrico.primitiva = { crear: crear, desdeAdorno: desdeAdorno };
})();
