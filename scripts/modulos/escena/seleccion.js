(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const procedimientos = Manual.dominio.procedimientos;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;

  function piezaSeleccionada() {
    return ctx.piezas.find((p) => p.id === ctx.seleccionada);
  }

  function botonProcedimiento(id) {
    const procedimiento = procedimientos.buscar(id);
    if (!procedimiento || !procedimientos.aplica(procedimiento, Manual.dominio.perfil.vigente())) return null;
    return crear('button', { type: 'button', clase: 'enlace-boton', 'data-ficha-abrir': id, texto: `${id} ${procedimiento.titulo}` });
  }

  function pintarDetalle() {
    const pieza = piezaSeleccionada();
    dom.vaciar(ctx.detalle);
    ctx.detalle.classList.toggle('detalle--vacio', !pieza);
    if (!pieza) return;
    const cerrar = crear('button', { type: 'button', clase: 'detalle__cerrar', 'aria-label': 'Cerrar' }, [Manual.componentes.icono.crear('cerrar')]);
    cerrar.addEventListener('click', limpiar);
    ctx.detalle.appendChild(cerrar);
    ctx.detalle.appendChild(crear('h3', { clase: 'detalle__nombre', texto: pieza.nombre }));
    ctx.detalle.appendChild(crear('p', { clase: 'detalle__texto', texto: pieza.descripcion }));
    ctx.detalle.appendChild(crear('div', { clase: 'detalle__procedimientos' }, pieza.procedimientos.map(botonProcedimiento)));
  }

  function aplicar() {
    ctx.svg.classList.toggle('dibujo--seleccion', !!ctx.seleccionada);
    Object.keys(ctx.nodos).forEach((id) => {
      ctx.nodos[id].entrada.classList.toggle('pieza--activa', id === ctx.seleccionada);
      ctx.nodos[id].entrada.setAttribute('aria-pressed', id === ctx.seleccionada ? 'true' : 'false');
    });
    pintarDetalle();
  }

  function alternar(id) {
    ctx.seleccionada = ctx.seleccionada === id ? null : id;
    aplicar();
  }

  function limpiar() {
    const anterior = ctx.seleccionada && ctx.nodos[ctx.seleccionada];
    ctx.seleccionada = null;
    aplicar();
    if (anterior) anterior.entrada.focus({ preventScroll: true });
  }

  function conservarSiExiste() {
    if (!piezaSeleccionada()) ctx.seleccionada = null;
    aplicar();
  }

  escena.seleccion = { alternar: alternar, limpiar: limpiar, conservarSiExiste: conservarSiExiste };
})();
