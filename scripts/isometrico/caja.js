(function () {
  'use strict';

  const Manual = window.Manual;
  const isometrico = Manual.isometrico;
  const crearSvg = Manual.nucleo.dom.crearSvg;
  const textoPuntos = isometrico.proyeccion.textoPuntos;

  function lados(c) {
    const x1 = c.x + c.an;
    const y1 = c.y + c.pr;
    const z1 = c.z + c.al;
    return [
      { n: [1, 0], v: [[x1, c.y, c.z], [x1, y1, c.z], [x1, y1, z1], [x1, c.y, z1]] },
      { n: [0, 1], v: [[c.x, y1, c.z], [x1, y1, c.z], [x1, y1, z1], [c.x, y1, z1]] },
      { n: [-1, 0], v: [[c.x, c.y, c.z], [c.x, y1, c.z], [c.x, y1, z1], [c.x, c.y, z1]] },
      { n: [0, -1], v: [[c.x, c.y, c.z], [x1, c.y, c.z], [x1, c.y, z1], [c.x, c.y, z1]] }
    ];
  }

  function crear(c, materialPieza) {
    const material = isometrico.materiales.obtener(c.material || materialPieza);
    const caras = lados(c).map(function (lado) {
      lado.nodo = crearSvg('polygon', { class: 'cara', stroke: material.borde });
      return lado;
    });
    const superior = isometrico.geometria.rectanguloHorizontal(c.x, c.y, c.x + c.an, c.y + c.pr, c.z + c.al);
    const nodoSuperior = crearSvg('polygon', { class: 'cara', fill: material.arriba, stroke: material.borde });
    const grupo = crearSvg(
      'g',
      {},
      caras
        .map(function (lado) {
          return lado.nodo;
        })
        .concat([nodoSuperior])
    );

    return {
      grupo: grupo,
      z: c.z,
      centro: [c.x + c.an / 2, c.y + c.pr / 2],
      pintar: function (proyector) {
        caras.forEach(function (lado) {
          const visible = proyector.normalVisible(lado.n[0], lado.n[1]);
          lado.nodo.style.display = visible ? '' : 'none';
          if (!visible) return;
          lado.nodo.setAttribute('points', textoPuntos(proyector, lado.v));
          lado.nodo.setAttribute('fill', isometrico.materiales.sombrear(material, proyector.luz(lado.n[0], lado.n[1])));
        });
        nodoSuperior.setAttribute('points', textoPuntos(proyector, superior));
      }
    };
  }

  isometrico.caja = { crear: crear };
})();
