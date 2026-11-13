(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const motor = Manual.dominio.diagnostico;
  const ESPERA_AVANCE = 260;

  function opcion(pregunta, elegida, i, respuestas, alCambiar) {
    const id = `diag-${pregunta.id}-${i}`;
    const varias = pregunta.tipo === 'varias';
    const actual = respuestas[pregunta.id];
    const entrada = crear('input', {
      type: varias ? 'checkbox' : 'radio',
      name: `diag-${pregunta.id}`,
      id: id,
      value: elegida.valor,
      clase: 'respuesta__entrada entrada-oculta'
    });
    entrada.checked = varias ? (actual || []).includes(elegida.valor) : actual === elegida.valor;
    entrada.addEventListener('change', () => alCambiar(elegida.valor, entrada.checked));
    return crear('div', { clase: 'respuesta' }, [
      entrada,
      crear('label', { clase: 'respuesta__etiqueta', for: id }, [
        crear('span', { clase: 'respuesta__texto', texto: elegida.texto }),
        elegida.ayuda ? crear('span', { clase: 'respuesta__ayuda', texto: elegida.ayuda }) : null
      ])
    ]);
  }

  function progreso(total, paso) {
    const puntos = [];
    for (let i = 0; i < total; i += 1) {
      puntos.push(
        crear('li', {
          clase: i < paso ? 'hecho' : i === paso ? 'actual' : '',
          'aria-current': i === paso ? 'step' : null,
          texto: String(i + 1)
        })
      );
    }
    return crear('ol', { clase: 'asistente__progreso', 'aria-label': 'Avance del diagnóstico' }, puntos);
  }

  function construir(estado, acciones) {
    const perfil = Manual.dominio.perfil.vigente();
    const respuestas = estado.respuestas;
    const preguntas = motor.preguntasVisibles(perfil, respuestas);
    const pregunta = preguntas[estado.paso];

    function esUltima() {
      return estado.paso >= motor.preguntasVisibles(perfil, respuestas).length - 1;
    }

    function avanzar() {
      if (esUltima()) acciones.resultado();
      else acciones.siguiente();
    }

    const continuar = crear('button', { clase: 'boton boton--primario', type: 'button', texto: esUltima() ? 'Ver resultado' : 'Continuar' });
    continuar.disabled = !motor.respondida(pregunta, respuestas[pregunta.id]);
    continuar.addEventListener('click', avanzar);

    const atras = crear('button', { clase: 'boton boton--plano', type: 'button', texto: 'Atrás', en: { click: acciones.anterior } });
    atras.disabled = estado.paso === 0;

    const opciones = crear('div', { clase: 'asistente__opciones' });
    let porPuntero = false;
    let avanzando = false;
    opciones.addEventListener('pointerdown', () => {
      porPuntero = true;
    });
    opciones.addEventListener('keydown', () => {
      porPuntero = false;
    });

    function avanzarSolo() {
      if (avanzando || !porPuntero || esUltima()) return;
      avanzando = true;
      estado.espera = window.setTimeout(avanzar, ESPERA_AVANCE);
    }

    function alCambiar(valor, marcado) {
      if (pregunta.tipo === 'varias') {
        respuestas[pregunta.id] = motor.alternar(pregunta, respuestas[pregunta.id], valor, marcado);
        dom.$$('.respuesta__entrada', opciones).forEach((e) => {
          e.checked = respuestas[pregunta.id].includes(e.value);
        });
      } else {
        respuestas[pregunta.id] = valor;
        avanzarSolo();
      }
      continuar.disabled = !motor.respondida(pregunta, respuestas[pregunta.id]);
      continuar.textContent = esUltima() ? 'Ver resultado' : 'Continuar';
    }
    motor.opcionesVisibles(pregunta, perfil).forEach((elegida, i) => {
      opciones.appendChild(opcion(pregunta, elegida, i, respuestas, alCambiar));
    });

    return crear('div', { clase: 'asistente__marco' }, [
      crear('p', { clase: 'asistente__contador', texto: `Pregunta ${estado.paso + 1} de ${preguntas.length}` }),
      progreso(preguntas.length, estado.paso),
      crear('fieldset', { clase: 'asistente__pregunta' }, [
        crear('legend', { clase: 'asistente__titulo', texto: pregunta.titulo }),
        pregunta.ayuda ? crear('p', { clase: 'asistente__ayuda', texto: pregunta.ayuda }) : null,
        opciones
      ]),
      crear('div', { clase: 'asistente__acciones' }, [atras, continuar])
    ]);
  }

  Manual.modulos.diagnostico.pregunta = { construir: construir };
})();
