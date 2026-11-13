(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const perfil = Manual.dominio.perfil;
  const coincide = Manual.dominio.condiciones.coincide;
  const datos = Manual.datos.perfiles;

  function grupoOpciones(campo, valorActual) {
    return crear(
      'div',
      { clase: 'opciones' },
      campo.opciones.map((opcion) => {
        const id = `perfil-${campo.clave}-${opcion.valor}`;
        const entrada = crear('input', { type: 'radio', name: `perfil-${campo.clave}`, id: id, value: opcion.valor, clase: 'opcion__entrada entrada-oculta' });
        entrada.checked = opcion.valor === valorActual;
        entrada.addEventListener('change', () => {
          const cambio = {};
          cambio[campo.clave] = opcion.valor;
          perfil.establecer(cambio);
        });
        return crear('div', { clase: 'opcion' }, [entrada, crear('label', { clase: 'opcion__etiqueta', for: id, texto: opcion.etiqueta })]);
      })
    );
  }

  function presets() {
    const actual = perfil.configurado() ? perfil.presetActual() : null;
    return crear(
      'div',
      { clase: 'presets', role: 'group', 'aria-label': 'Perfiles listos para usar' },
      datos.presets.map((preset) => {
        const activo = preset.id === actual;
        return crear(
          'button',
          {
            type: 'button',
            name: 'preset',
            value: preset.id,
            clase: 'preset' + (activo ? ' preset--activo' : ''),
            'aria-pressed': activo ? 'true' : 'false',
            en: { click: () => perfil.establecer(preset.valores) }
          },
          [crear('span', { clase: 'preset__nombre', texto: preset.nombre }), crear('span', { clase: 'preset__detalle', texto: preset.descripcion })]
        );
      })
    );
  }

  function construir() {
    const valores = perfil.vigente() || {};
    const bloques = [crear('section', { clase: 'hoja__bloque' }, [crear('h3', { texto: 'Perfiles listos para usar' }), presets()])];
    datos.campos.forEach(function (campo) {
      if (campo.soloSi && !coincide(campo.soloSi, valores)) return;
      bloques.push(
        crear('fieldset', { clase: 'hoja__bloque' }, [
          crear('legend', { texto: campo.titulo }),
          crear('p', { clase: 'hoja__ayuda', texto: campo.ayuda }),
          grupoOpciones(campo, valores[campo.clave])
        ])
      );
    });
    return bloques;
  }

  Manual.modulos.perfil.formulario = { construir: construir };
})();
