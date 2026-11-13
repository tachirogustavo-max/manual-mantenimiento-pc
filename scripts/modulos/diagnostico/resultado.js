(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const procedimientos = Manual.dominio.procedimientos;
  const MAXIMO = 4;

  function alerta(datos) {
    return crear('div', { clase: 'alerta', role: 'alert' }, [
      crear('h3', { texto: datos.titulo }),
      crear('p', { texto: datos.texto }),
      crear('button', {
        clase: 'enlace-boton',
        type: 'button',
        'data-ficha-abrir': datos.procedimiento,
        texto: `Abrir ${datos.procedimiento}: ${procedimientos.buscar(datos.procedimiento).titulo}`
      })
    ]);
  }

  function explicar(motivos) {
    const citas = motivos.slice(0, 2).map((motivo) => `"${motivo}"`);
    return `Porque respondiste ${citas.join(' y ')}.`;
  }

  function elemento(id, i, motivos, completo) {
    const p = procedimientos.buscar(id);
    return crear('li', {}, [
      crear('button', { clase: 'resultado__item', type: 'button', 'data-ficha-abrir': id }, [
        crear('span', { clase: 'resultado__orden', texto: String(i + 1) }),
        crear('span', { clase: 'resultado__texto' }, [
          crear('span', { clase: 'fila__codigo mono', texto: p.id }),
          crear('span', { clase: 'resultado__titulo', texto: p.titulo }),
          crear('span', { clase: 'resultado__motivo', texto: completo ? p.resumen : explicar(motivos[id]) })
        ]),
        Manual.componentes.sello.crear(p.riesgo)
      ])
    ]);
  }

  function construir(resultado, reiniciar) {
    return crear('div', { clase: 'asistente__marco' }, [
      crear('div', { clase: 'resultado__encabezado' }, [crear('h3', { clase: 'asistente__titulo', texto: 'Qué revisar, en orden' })]),
      resultado.alertas.length ? crear('div', { clase: 'resultado__alertas' }, resultado.alertas.map(alerta)) : null,
      crear(
        'ol',
        { clase: 'resultado__lista' },
        resultado.ordenados
          .slice(0, resultado.completo ? resultado.ordenados.length : MAXIMO)
          .map((id, i) => elemento(id, i, resultado.motivos, resultado.completo))
      ),
      crear('div', { clase: 'asistente__acciones' }, [
        crear('button', { clase: 'boton boton--plano', type: 'button', texto: 'Empezar de nuevo', en: { click: reiniciar } })
      ])
    ]);
  }

  Manual.modulos.diagnostico.resultado = { construir: construir };
})();
