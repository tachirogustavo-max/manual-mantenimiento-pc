(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const componentes = Manual.componentes;
  const procedimientos = Manual.dominio.procedimientos;
  const ficha = Manual.modulos.ficha;

  function seccion(titulo, contenido, clase) {
    return crear('section', { clase: 'ficha__seccion' + (clase ? ' ' + clase : '') }, [crear('h3', { texto: titulo }), contenido]);
  }

  function dato(titulo, valor) {
    return crear('div', {}, [crear('dt', { texto: titulo }), typeof valor === 'string' ? crear('dd', { texto: valor }) : valor]);
  }

  function cajetin(p) {
    return crear('header', { clase: 'cajetin' }, [
      crear('h2', { id: 'ficha-titulo', clase: 'cajetin__titulo', texto: p.titulo }),
      crear('p', { clase: 'cajetin__resumen', texto: p.resumen }),
      crear('dl', { clase: 'cajetin__datos' }, [
        dato('Riesgo', crear('dd', {}, [componentes.sello.crear(p.riesgo)])),
        dato('Duración', p.duracion),
        dato('Aplica a', p.soloPerfil ? 'Laptops' : 'Escritorio y laptop'),
        dato('Avance', crear('dd', { id: 'ficha-avance' }))
      ])
    ]);
  }

  function perfilAjustado(perfil) {
    if (!perfil) {
      return crear('p', { clase: 'ficha__perfil' }, [
        'Incluye los pasos de todo tipo de equipo. ',
        crear('button', { clase: 'enlace-boton', type: 'button', 'data-accion': 'perfil', texto: 'Elegir equipo' })
      ]);
    }
    return crear('p', { clase: 'ficha__perfil' }, [
      'Para ',
      crear('strong', { texto: Manual.dominio.perfil.resumen(perfil).join(', ') }),
      ' ',
      crear('button', { clase: 'enlace-boton', type: 'button', 'data-accion': 'perfil', texto: 'Cambiar' })
    ]);
  }

  function acciones() {
    return crear('div', { clase: 'ficha__acciones' }, [
      crear('button', { clase: 'boton boton--primario', type: 'button', 'data-accion': 'paso-a-paso', texto: 'Modo paso a paso' })
    ]);
  }

  function necesitas(p) {
    const cantidad = p.herramientas.length;
    return crear('details', { clase: 'preparacion__necesitas' }, [
      crear('summary', { texto: 'Qué necesitas (' + cantidad + (cantidad === 1 ? ' elemento)' : ' elementos)') }),
      componentes.lista.crear(p.herramientas, 'herramientas-ficha')
    ]);
  }

  function preparacion(p) {
    const hayAvisos = p.advertencias && p.advertencias.length;
    const clase = hayAvisos ? 'avisos avisos--' + p.riesgo : 'avisos avisos--bajo';
    return crear('section', { clase: clase + ' preparacion', 'aria-label': 'Antes de empezar' }, [
      crear('h3', { texto: 'Antes de empezar' }),
      hayAvisos ? componentes.lista.crear(p.advertencias, 'avisos__lista') : null,
      necesitas(p)
    ]);
  }

  function pasos(p, perfil) {
    const hechos = Manual.dominio.progreso.leer(p.id);
    const lista = crear('ol', { clase: 'pasos' });
    procedimientos.pasosVisibles(p, perfil).forEach((elemento, i) => {
      lista.appendChild(ficha.paso.crear(elemento, p, i + 1, hechos.includes(elemento.indice), false));
    });
    return crear('section', { clase: 'ficha__seccion' }, [crear('h3', { texto: 'Pasos' }), perfilAjustado(perfil), lista]);
  }

  function textoInterruptor(abierto, cantidad) {
    const objeto = cantidad === 1 ? 'el paso de otra configuración' : `los ${cantidad} pasos de otras configuraciones`;
    return (abierto ? 'Ocultar ' : 'Ver ') + objeto;
  }

  function otrosPasos(p, perfil, estado) {
    const ocultos = procedimientos.pasosOcultos(p, perfil);
    if (!ocultos.length) return null;
    const lista = crear('ol', { clase: 'pasos' });
    ocultos.forEach((elemento) => lista.appendChild(ficha.paso.crear(elemento, p, 0, false, true)));
    const interruptor = crear('button', { clase: 'boton boton--plano', type: 'button' });
    function aplicar() {
      lista.hidden = !estado.mostrarOtros;
      interruptor.setAttribute('aria-expanded', estado.mostrarOtros ? 'true' : 'false');
      interruptor.textContent = textoInterruptor(estado.mostrarOtros, ocultos.length);
    }
    interruptor.addEventListener('click', () => {
      estado.mostrarOtros = !estado.mostrarOtros;
      aplicar();
    });
    aplicar();
    return crear('div', { clase: 'ficha__otros' }, [interruptor, lista]);
  }

  function fuentes(p) {
    return seccion('Fuentes', componentes.citas.crear(p.fuentes));
  }

  function firma() {
    const a = Manual.datos.autoria;
    return crear('p', {
      clase: 'ficha__firma',
      texto: `Manual de mantenimiento de computadores. ${a.nombre}, ${a.carrera}, ${a.universidad}. ${a.materia}, ${a.anio}.`
    });
  }

  function construir(p, perfil, estado) {
    const aviso = procedimientos.aplica(p, perfil)
      ? null
      : crear('p', { clase: 'aviso', texto: procedimientos.motivoNoAplica(p) + '. Se muestra solo como consulta.' });
    return [
      cajetin(p),
      acciones(),
      aviso,
      preparacion(p),
      pasos(p, perfil),
      p.tabla ? seccion('Referencia', componentes.tabla.crear(p.tabla, { primeraMono: true })) : null,
      otrosPasos(p, perfil, estado),
      seccion('Cómo comprobar que quedó bien', componentes.lista.crear(p.verificacion)),
      seccion('Cuándo llamar a un técnico', componentes.lista.crear(p.tecnico), 'ficha__seccion--tecnico'),
      fuentes(p),
      crear('div', { clase: 'ficha__pie' }, [
        crear('button', { clase: 'boton boton--plano', type: 'button', 'data-accion': 'reiniciar', texto: 'Reiniciar avance' })
      ]),
      firma()
    ].filter(Boolean);
  }

  ficha.contenido = { construir: construir };
})();
