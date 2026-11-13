(function () {
  'use strict';

  const Manual = window.Manual;
  const isometrico = Manual.isometrico;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;

  let pendiente = false;
  let ordenActual = '';

  function claveProfundidad(pieza, proyector, desplazamiento) {
    const c = ctx.nodos[pieza.id].centro;
    const profundidad = proyector.profundidad(c[0] + desplazamiento[0], c[1] + desplazamiento[1]);
    return (pieza.capa || 0) * 1e6 + profundidad + c[2] + desplazamiento[2];
  }

  function ordenarPiezas(profundidades) {
    if (!ctx.capaMarcas) return;
    profundidades.sort((a, b) => a.clave - b.clave);
    const clave = profundidades.map((p) => p.id).join(',');
    if (clave === ordenActual) return;
    ordenActual = clave;
    profundidades.forEach((p) => ctx.svg.insertBefore(ctx.nodos[p.id].entrada, ctx.capaMarcas));
  }

  function pintar() {
    const proyector = isometrico.proyeccion.crearProyector(ctx.centro, ctx.giro);
    if (ctx.nodoHuella) {
      const base = ctx.piezas.find((p) => p.id === 'base') || ctx.piezas[0];
      if (base) ctx.nodoHuella.setAttribute('points', isometrico.proyeccion.textoPuntos(proyector, isometrico.medidas.huella(base)));
    }
    const marcas = [];
    const profundidades = [];
    ctx.piezas.forEach(function (pieza) {
      const nodo = ctx.nodos[pieza.id];
      const avance = ctx.progresos[pieza.id] ? ctx.progresos[pieza.id].v : 0;
      const final = isometrico.medidas.desplazamientoFinal(pieza);
      const desplazamiento = [final[0] * avance, final[1] * avance, final[2] * avance];
      nodo.vivo.actualizar(proyector, desplazamiento);
      const ancla = nodo.vivo.anclaje(proyector, desplazamiento);
      marcas.push({ nodo: nodo, x: ancla[0], y: ancla[1] });
      profundidades.push({ id: pieza.id, clave: claveProfundidad(pieza, proyector, desplazamiento) });
    });
    ordenarPiezas(profundidades);
    escena.marcas.acomodar(marcas);
  }

  function solicitar() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(function () {
      pendiente = false;
      pintar();
    });
  }

  function reiniciarOrden() {
    ordenActual = '';
  }

  escena.pintor = { pintar: pintar, solicitar: solicitar, reiniciarOrden: reiniciarOrden };
})();
