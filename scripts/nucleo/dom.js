(function () {
  'use strict';

  const NS_SVG = 'http://www.w3.org/2000/svg';

  function vacio(valor) {
    return valor === null || valor === undefined || valor === false;
  }

  function $(selector, raiz) {
    return (raiz || document).querySelector(selector);
  }

  function $$(selector, raiz) {
    return Array.prototype.slice.call((raiz || document).querySelectorAll(selector));
  }

  function crear(etiqueta, atributos, hijos) {
    const elemento = document.createElement(etiqueta);
    const lista = atributos || {};
    Object.keys(lista).forEach(function (nombre) {
      const valor = lista[nombre];
      if (vacio(valor)) return;
      if (nombre === 'clase') elemento.className = valor;
      else if (nombre === 'texto') elemento.textContent = valor;
      else if (nombre === 'en') {
        Object.keys(valor).forEach(function (evento) {
          elemento.addEventListener(evento, valor[evento]);
        });
      } else elemento.setAttribute(nombre, valor === true ? '' : valor);
    });
    [].concat(hijos || []).forEach(function (hijo) {
      if (vacio(hijo)) return;
      elemento.appendChild(typeof hijo === 'string' ? document.createTextNode(hijo) : hijo);
    });
    return elemento;
  }

  function crearSvg(etiqueta, atributos, hijos) {
    const elemento = document.createElementNS(NS_SVG, etiqueta);
    const lista = atributos || {};
    Object.keys(lista).forEach(function (nombre) {
      if (lista[nombre] !== null && lista[nombre] !== undefined) elemento.setAttribute(nombre, lista[nombre]);
    });
    [].concat(hijos || []).forEach(function (hijo) {
      if (hijo) elemento.appendChild(hijo);
    });
    return elemento;
  }

  function vaciar(elemento) {
    elemento.innerHTML = '';
    return elemento;
  }

  window.Manual.nucleo.dom = { $: $, $$: $$, crear: crear, crearSvg: crearSvg, vaciar: vaciar };
})();
