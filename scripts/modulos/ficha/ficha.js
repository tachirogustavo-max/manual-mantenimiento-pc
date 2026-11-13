(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const procedimientos = Manual.dominio.procedimientos;
  const ficha = Manual.modulos.ficha;
  const ESPERA_CIERRE = 350;

  const estado = { id: null, mostrarOtros: false };
  let cuerpo = null;
  let superposicion = null;

  function render(id) {
    const procedimiento = procedimientos.buscar(id);
    if (!procedimiento) return;
    estado.id = id;
    dom.$('#ficha-codigo').textContent = procedimiento.id + ' ' + procedimientos.nombreTipo(procedimiento);
    dom.vaciar(cuerpo);
    cuerpo.scrollTop = 0;
    ficha.contenido.construir(procedimiento, Manual.dominio.perfil.vigente(), estado).forEach(function (bloque) {
      cuerpo.appendChild(bloque);
    });
    ficha.avance.actualizar(procedimiento);
  }

  function renderConservandoPosicion() {
    const posicion = cuerpo.scrollTop;
    render(estado.id);
    cuerpo.scrollTop = posicion;
  }

  function solicitarCierre() {
    if (superposicion.estaAbierta()) ficha.historial.salir(superposicion.cerrar);
  }

  function abrir(id) {
    if (!procedimientos.buscar(id)) return;
    const yaAbierta = superposicion.estaAbierta();
    ficha.historial.registrar(id, yaAbierta && estado.id === id);
    if (!yaAbierta) superposicion.abrir();
    estado.mostrarOtros = false;
    render(id);
  }

  function abrirDesdeHash() {
    const id = ficha.historial.leer();
    if (!id || !procedimientos.buscar(id)) return;
    superposicion.abrir();
    render(id);
  }

  function alMarcarPaso(evento) {
    const entrada = evento.target;
    if (!entrada.classList.contains('paso__entrada') || !estado.id) return;
    Manual.dominio.progreso.marcar(estado.id, Number(entrada.getAttribute('data-indice')), entrada.checked);
    entrada.closest('.paso').classList.toggle('paso--hecho', entrada.checked);
    ficha.avance.actualizar(procedimientos.buscar(estado.id));
  }

  function alPulsar(evento) {
    const disparador = evento.target.closest('[data-ver], [data-accion]');
    if (!disparador) return;
    const ver = disparador.getAttribute('data-ver');
    const accion = disparador.getAttribute('data-accion');
    if (ver === ficha.paso.ID_FIRMWARE) {
      solicitarCierre();
      window.setTimeout(function () {
        Manual.nucleo.desplazamiento.irA('#herramientas-firmware');
      }, ESPERA_CIERRE);
    } else if (ver) {
      abrir(ver);
    } else if (accion === 'perfil') {
      Manual.modulos.perfil.abrir();
    } else if (accion === 'paso-a-paso') {
      Manual.modulos.modoPaso.abrir(estado.id);
    } else if (accion === 'reiniciar') {
      Manual.dominio.progreso.borrar(estado.id);
      render(estado.id);
    }
  }

  function alCambiarProgreso(id) {
    const tallerAbierto = dom.$('#modo-paso').classList.contains('superposicion--abierta');
    if (tallerAbierto && superposicion.estaAbierta() && id === estado.id) renderConservandoPosicion();
  }

  function iniciar() {
    cuerpo = dom.$('#ficha-cuerpo');
    superposicion = Manual.nucleo.superposicion.crear(dom.$('#ficha'), {
      enfoqueInicial: function () {
        return cuerpo;
      },
      pedirCierre: solicitarCierre,
      alCerrar: function () {
        estado.id = null;
        estado.mostrarOtros = false;
      }
    });

    cuerpo.addEventListener('change', alMarcarPaso);
    cuerpo.addEventListener('click', alPulsar);
    dom.$('#ficha-imprimir').addEventListener('click', function () {
      Manual.nucleo.impresion.imprimir('ficha');
    });
    document.addEventListener('click', function (evento) {
      const boton = evento.target.closest('[data-ficha-abrir]');
      if (boton && boton.getAttribute('aria-disabled') !== 'true') abrir(boton.getAttribute('data-ficha-abrir'));
    });

    Manual.dominio.perfil.suscribir(function () {
      if (estado.id && superposicion.estaAbierta()) render(estado.id);
    });
    Manual.dominio.progreso.suscribir(alCambiarProgreso);
    ficha.historial.alNavegar(
      function (id) {
        if (!superposicion.estaAbierta()) superposicion.abrir();
        render(id);
      },
      function () {
        if (superposicion.estaAbierta()) superposicion.cerrar();
      }
    );
  }

  ficha.iniciar = iniciar;
  ficha.abrir = abrir;
  ficha.abrirDesdeHash = abrirDesdeHash;
})();
