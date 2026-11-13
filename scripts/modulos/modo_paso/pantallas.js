(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const componentes = Manual.componentes;
  const modoPaso = Manual.modulos.modoPaso;

  function lista(textos) {
    return componentes.lista.crear(textos, 'taller__lista');
  }

  function boton(texto, clase, accion) {
    return crear('button', { type: 'button', clase: 'boton ' + clase, texto: texto, en: { click: accion } });
  }

  function bloque(titulo, contenido, aviso) {
    return crear('section', { clase: 'taller__bloque' + (aviso ? ' taller__bloque--aviso' : '') }, [crear('h3', { texto: titulo }), contenido]);
  }

  function inicial(t, acciones) {
    const p = t.procedimiento;
    return {
      cuerpo: [
        crear('p', { clase: 'taller__sobretitulo', texto: `${p.id} ${Manual.dominio.procedimientos.nombreTipo(p)}` }),
        crear('h2', { clase: 'taller__enunciado', texto: p.titulo }),
        crear('p', { clase: 'taller__resumen', texto: p.resumen }),
        p.advertencias && p.advertencias.length ? bloque('Antes de empezar', lista(p.advertencias), true) : null,
        bloque('Necesitas', lista(p.herramientas))
      ],
      pie: [boton('Empezar', 'boton--oro boton--ancho', acciones.siguiente)]
    };
  }

  function paso(t, acciones) {
    const actual = t.pasos[t.indice].paso;
    const ultimo = t.indice === t.pasos.length - 1;
    return {
      cuerpo: [
        crear('p', { clase: 'taller__sobretitulo', texto: `Paso ${t.indice + 1} de ${t.pasos.length}` }),
        crear('p', { clase: 'taller__numero', 'aria-hidden': 'true', texto: String(t.indice + 1) }),
        crear('h2', { clase: 'taller__enunciado', texto: actual.texto }),
        actual.nivel === 'tecnico' ? crear('p', { clase: 'taller__etiqueta', texto: 'Nivel técnico. Si no estás seguro, consulta a un técnico.' }) : null,
        actual.detalle ? crear('p', { clase: 'taller__detalle', texto: actual.detalle }) : null,
        actual.comando ? componentes.comando.crear(actual.comando) : null
      ],
      pie: [
        boton('Atrás', 'boton--contorno', acciones.anterior),
        boton(ultimo ? 'Hecho, terminar' : 'Hecho, siguiente', 'boton--oro boton--ancho', acciones.completar)
      ]
    };
  }

  function final(t, acciones) {
    const p = t.procedimiento;
    const verificacion = crear(
      'ul',
      { clase: 'taller__verificacion' },
      p.verificacion.map((texto, i) => {
        const id = `verificacion-${i}`;
        return crear('li', {}, [crear('input', { type: 'checkbox', id: id, clase: 'taller__casilla' }), crear('label', { for: id, texto: texto })]);
      })
    );
    return {
      cuerpo: [
        crear('p', { clase: 'taller__sobretitulo', texto: 'Último paso' }),
        crear('h2', { clase: 'taller__enunciado', texto: 'Comprueba que quedó bien' }),
        verificacion,
        bloque('Cuándo llamar a un técnico', lista(p.tecnico), true)
      ],
      pie: [boton('Atrás', 'boton--contorno', acciones.anterior), boton('Terminar', 'boton--oro boton--ancho', acciones.terminar)]
    };
  }

  function construir(t, acciones) {
    if (t.indice < 0) return inicial(t, acciones);
    if (t.indice < t.pasos.length) return paso(t, acciones);
    return final(t, acciones);
  }

  modoPaso.pantallas = { construir: construir };
})();
