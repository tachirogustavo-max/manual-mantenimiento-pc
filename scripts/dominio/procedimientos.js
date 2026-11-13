(function () {
  'use strict';

  const Manual = window.Manual;
  const coincide = Manual.dominio.condiciones.coincide;
  const progreso = Manual.dominio.progreso;
  const todos = Manual.datos.preventivos.concat(Manual.datos.correctivos);

  const ETIQUETAS_RIESGO = {
    bajo: 'Riesgo bajo',
    medio: 'Riesgo medio',
    alto: 'Riesgo alto',
    critico: 'Riesgo crítico'
  };

  function buscar(id) {
    return todos.find((p) => p.id === id);
  }

  function aplica(procedimiento, perfil) {
    return !procedimiento.soloPerfil || coincide(procedimiento.soloPerfil, perfil);
  }

  function pasosVisibles(procedimiento, perfil) {
    const resultado = [];
    procedimiento.pasos.forEach(function (paso, indice) {
      if (!paso.solo || coincide(paso.solo, perfil)) resultado.push({ indice: indice, paso: paso });
    });
    return resultado;
  }

  function pasosOcultos(procedimiento, perfil) {
    const visibles = pasosVisibles(procedimiento, perfil).map(function (v) {
      return v.indice;
    });
    return procedimiento.pasos
      .map(function (paso, indice) {
        return { indice: indice, paso: paso };
      })
      .filter(function (elemento) {
        return visibles.indexOf(elemento.indice) === -1;
      });
  }

  function avance(procedimiento, perfil) {
    const visibles = pasosVisibles(procedimiento, perfil);
    const hechos = progreso.leer(procedimiento.id);
    const completados = visibles.filter(function (v) {
      return hechos.indexOf(v.indice) !== -1;
    }).length;
    const total = visibles.length;
    return { completados: completados, total: total, porcentaje: total ? Math.round((completados / total) * 100) : 0 };
  }

  function motivoNoAplica(procedimiento) {
    return procedimiento.soloPerfil && procedimiento.soloPerfil.tipo ? 'Solo para laptops' : 'No aplica a este equipo';
  }

  function nombreTipo(procedimiento) {
    return procedimiento.tipo === 'preventivo' ? 'Preventivo' : 'Correctivo';
  }

  function etiquetaRiesgo(riesgo) {
    return ETIQUETAS_RIESGO[riesgo];
  }

  Manual.dominio.procedimientos = {
    todos: todos,
    buscar: buscar,
    aplica: aplica,
    pasosVisibles: pasosVisibles,
    pasosOcultos: pasosOcultos,
    avance: avance,
    motivoNoAplica: motivoNoAplica,
    nombreTipo: nombreTipo,
    etiquetaRiesgo: etiquetaRiesgo
  };
})();
