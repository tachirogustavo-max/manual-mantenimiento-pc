(function () {
  'use strict';

  const Manual = window.Manual;
  const datos = Manual.datos.diagnostico;
  const coincide = Manual.dominio.condiciones.coincide;
  const procedimientos = Manual.dominio.procedimientos;

  function opcionesVisibles(pregunta, perfil) {
    return pregunta.opciones.filter(function (opcion) {
      return !opcion.solo || coincide(opcion.solo, perfil);
    });
  }

  function omitida(pregunta, respuestas) {
    if (!pregunta.omitirSi || !respuestas) return false;
    return Object.keys(pregunta.omitirSi).some(function (id) {
      return pregunta.omitirSi[id].indexOf(respuestas[id]) !== -1;
    });
  }

  function preguntasVisibles(perfil, respuestas) {
    return datos.preguntas.filter(function (pregunta) {
      return opcionesVisibles(pregunta, perfil).length > 1 && !omitida(pregunta, respuestas);
    });
  }

  function opcion(pregunta, valor) {
    return pregunta.opciones.filter(function (o) {
      return o.valor === valor;
    })[0];
  }

  function alternar(pregunta, seleccion, valor, marcado) {
    const elegida = opcion(pregunta, valor);
    if (elegida && elegida.exclusiva && marcado) return [valor];
    const lista = (seleccion || []).filter(function (v) {
      const otra = opcion(pregunta, v);
      return v !== valor && !(otra && otra.exclusiva);
    });
    if (marcado) lista.push(valor);
    return lista;
  }

  function respondida(pregunta, valor) {
    return pregunta.tipo === 'varias' ? !!(valor && valor.length) : valor !== undefined && valor !== null;
  }

  function resolverAlerta(alerta, perfil) {
    if (typeof alerta.procedimiento === 'string') return alerta;
    const tipo = perfil ? perfil.tipo : 'escritorio';
    return Object.assign({}, alerta, { procedimiento: alerta.procedimiento[tipo] });
  }

  function depurar(respuestas, perfil) {
    datos.preguntas.forEach(function (pregunta) {
      const validas = opcionesVisibles(pregunta, perfil).map(function (o) {
        return o.valor;
      });
      const valor = respuestas[pregunta.id];
      if (Array.isArray(valor)) respuestas[pregunta.id] = valor.filter(function (v) {
        return validas.indexOf(v) !== -1;
      });
      else if (valor !== undefined && validas.indexOf(valor) === -1) delete respuestas[pregunta.id];
    });
    return respuestas;
  }

  function calcular(respuestas, perfil) {
    const puntos = {};
    const motivos = {};
    const alertas = [];

    datos.preguntas.forEach(function (pregunta) {
      if (omitida(pregunta, respuestas)) return;
      const valor = respuestas[pregunta.id];
      if (!valor) return;
      [].concat(valor).forEach(function (v) {
        const elegida = opcion(pregunta, v);
        if (!elegida || (elegida.solo && !coincide(elegida.solo, perfil))) return;
        Object.keys(elegida.puntos).forEach(function (id) {
          puntos[id] = (puntos[id] || 0) + elegida.puntos[id];
          motivos[id] = motivos[id] || [];
          if (motivos[id].indexOf(elegida.texto) === -1) motivos[id].push(elegida.texto);
        });
        if (elegida.alerta) alertas.push(resolverAlerta(datos.alertas[elegida.alerta], perfil));
      });
    });

    const ordenados = Object.keys(puntos)
      .filter(function (id) {
        const procedimiento = procedimientos.buscar(id);
        return procedimiento && procedimientos.aplica(procedimiento, perfil);
      })
      .sort(function (a, b) {
        return puntos[b] - puntos[a];
      });

    return { ordenados: ordenados, motivos: motivos, alertas: alertas, completo: respuestas.sintoma === 'prevenir' };
  }

  Manual.dominio.diagnostico = {
    opcionesVisibles: opcionesVisibles,
    preguntasVisibles: preguntasVisibles,
    alternar: alternar,
    respondida: respondida,
    depurar: depurar,
    calcular: calcular
  };
})();
