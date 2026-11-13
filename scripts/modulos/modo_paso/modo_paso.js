(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const procedimientos = Manual.dominio.procedimientos;
  const progreso = Manual.dominio.progreso;
  const modoPaso = Manual.modulos.modoPaso;

  const taller = { procedimiento: null, pasos: [], indice: -1 };
  let elementos = null;
  let superposicion = null;

  function marcarHecho(posicion) {
    progreso.marcar(taller.procedimiento.id, taller.pasos[posicion].indice, true);
  }

  function ir(nuevo, direccion) {
    taller.indice = Math.max(-1, Math.min(taller.pasos.length, nuevo));
    render(direccion);
  }

  const acciones = {
    siguiente: function () {
      ir(taller.indice + 1, 1);
    },
    anterior: function () {
      ir(taller.indice - 1, -1);
    },
    completar: function () {
      marcarHecho(taller.indice);
      ir(taller.indice + 1, 1);
    },
    terminar: function () {
      superposicion.cerrar();
    }
  };

  function actualizarAvance() {
    const total = taller.pasos.length;
    const i = taller.indice;
    const avance = i < 0 || !total ? 0 : Math.min(i, total) / total;
    elementos.contador.textContent = i < 0 ? 'Inicio' : i >= total ? 'Final' : i + 1 + ' / ' + total;
    elementos.barra.firstElementChild.style.transform = 'scaleX(' + avance + ')';
    elementos.barra.setAttribute('aria-valuenow', String(Math.round(avance * 100)));
  }

  function animarEntrada(direccion) {
    if (!direccion || !Manual.nucleo.movimiento.animable()) return;
    window.gsap.from(elementos.cuerpo.children, {
      x: 40 * direccion,
      opacity: 0,
      duration: 0.34,
      ease: 'power2.out',
      stagger: 0.04,
      clearProps: 'opacity,transform'
    });
  }

  function render(direccion) {
    const pantalla = modoPaso.pantallas.construir(taller, acciones);
    dom.vaciar(elementos.cuerpo);
    dom.vaciar(elementos.pie);
    elementos.cuerpo.scrollTop = 0;
    elementos.titulo.textContent = taller.procedimiento.titulo;
    pantalla.cuerpo.filter(Boolean).forEach(function (nodo) {
      elementos.cuerpo.appendChild(nodo);
    });
    pantalla.pie.forEach(function (nodo) {
      elementos.pie.appendChild(nodo);
    });
    actualizarAvance();
    animarEntrada(direccion);
    if (direccion && superposicion.estaAbierta()) superposicion.enfocar();
  }

  function primerPendiente(id) {
    const hechos = progreso.leer(id);
    if (!hechos.length) return -1;
    for (let i = 0; i < taller.pasos.length; i += 1) {
      if (!hechos.includes(taller.pasos[i].indice)) return i;
    }
    return -1;
  }

  function abrir(id) {
    const encontrado = procedimientos.buscar(id);
    if (!encontrado) return;
    taller.procedimiento = encontrado;
    taller.pasos = procedimientos.pasosVisibles(encontrado, Manual.dominio.perfil.vigente());
    taller.indice = primerPendiente(id);
    render(0);
    superposicion.abrir();
    Manual.nucleo.pantallaActiva.pedir();
  }

  function iniciar() {
    elementos = {
      cuerpo: dom.$('#modo-paso-cuerpo'),
      pie: dom.$('#modo-paso-pie'),
      titulo: dom.$('#modo-paso-titulo'),
      contador: dom.$('#modo-paso-contador'),
      barra: dom.$('#modo-paso-barra')
    };
    superposicion = Manual.nucleo.superposicion.crear(dom.$('#modo-paso'), {
      enfoqueInicial: function () {
        return elementos.cuerpo;
      },
      alCerrar: function () {
        Manual.nucleo.pantallaActiva.liberar();
        taller.procedimiento = null;
      }
    });
    modoPaso.gestos.activar(
      elementos.cuerpo,
      superposicion.esSuperior,
      function (marcar) {
        if (taller.indice >= taller.pasos.length) return;
        if (marcar && taller.indice >= 0) marcarHecho(taller.indice);
        acciones.siguiente();
      },
      function () {
        if (taller.indice > -1) acciones.anterior();
      }
    );
  }

  modoPaso.iniciar = iniciar;
  modoPaso.abrir = abrir;
})();
