(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const motor = Manual.dominio.diagnostico;
  const diagnostico = Manual.modulos.diagnostico;

  const estado = { paso: 0, respuestas: {}, terminado: false, espera: null };
  let raiz = null;

  function alinear() {
    const cabecera = dom.$('#cabecera');
    const margen = (cabecera ? cabecera.getBoundingClientRect().bottom : 0) + 14;
    const arriba = raiz.getBoundingClientRect().top;
    if (arriba < margen) window.scrollBy({ top: arriba - margen, behavior: Manual.nucleo.movimiento.comportamiento() });
  }

  function cancelarEspera() {
    window.clearTimeout(estado.espera);
    estado.espera = null;
  }

  function mostrarPregunta(alinearVista) {
    cancelarEspera();
    const marco = diagnostico.pregunta.construir(estado, acciones);
    dom.vaciar(raiz).appendChild(marco);
    diagnostico.animaciones.pregunta(marco);
    if (alinearVista) alinear();
  }

  function mostrarResultado() {
    cancelarEspera();
    const resultado = motor.calcular(estado.respuestas, Manual.dominio.perfil.vigente());
    estado.terminado = true;
    dom.vaciar(raiz).appendChild(diagnostico.resultado.construir(resultado, reiniciar));
    diagnostico.animaciones.resultado(raiz);
    raiz.scrollIntoView({ block: 'nearest', behavior: Manual.nucleo.movimiento.comportamiento() });
  }

  function reiniciar() {
    estado.paso = 0;
    estado.respuestas = {};
    estado.terminado = false;
    mostrarPregunta();
  }

  const acciones = {
    siguiente: function () {
      estado.paso += 1;
      mostrarPregunta(true);
    },
    anterior: function () {
      estado.paso = Math.max(0, estado.paso - 1);
      mostrarPregunta(true);
    },
    resultado: mostrarResultado
  };

  function iniciar() {
    raiz = dom.$('#diagnostico-asistente');
    if (!raiz) return;
    Manual.dominio.perfil.suscribir(function (perfil) {
      if (estado.terminado) return;
      motor.depurar(estado.respuestas, perfil);
      estado.paso = Math.min(estado.paso, motor.preguntasVisibles(perfil, estado.respuestas).length - 1);
      mostrarPregunta();
    });
    mostrarPregunta();
  }

  diagnostico.iniciar = iniciar;
})();
