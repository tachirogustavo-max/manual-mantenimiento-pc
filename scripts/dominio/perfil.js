(function () {
  'use strict';

  const Manual = window.Manual;
  const almacen = Manual.nucleo.almacen;
  const presets = Manual.datos.perfiles.presets;
  const campos = Manual.datos.perfiles.campos;
  const oyentes = [];
  const CLAVE = 'equipo';

  function normalizar(perfil) {
    const copia = Object.assign({}, perfil);
    if (copia.tipo === 'escritorio') copia.bateria = 'no_aplica';
    else if (copia.bateria !== 'removible' && copia.bateria !== 'integrada') copia.bateria = 'integrada';
    return copia;
  }

  const leido = almacen.leer(CLAVE, null);
  const guardado = leido && typeof leido === 'object' && !Array.isArray(leido) ? leido : null;
  let actual = normalizar(Object.assign({}, presets[0].valores, guardado || {}));
  let elegido = guardado !== null;

  function etiquetaOpcion(clave, valor) {
    const campo = campos.filter(function (c) {
      return c.clave === clave;
    })[0];
    if (!campo) return valor;
    const opcion = campo.opciones.filter(function (o) {
      return o.valor === valor;
    })[0];
    return opcion ? opcion.etiqueta : valor;
  }

  function leer() {
    return actual;
  }

  function establecer(parcial) {
    actual = normalizar(Object.assign({}, actual, parcial));
    elegido = true;
    almacen.guardar(CLAVE, actual);
    oyentes.forEach(function (oyente) {
      oyente(actual);
    });
  }

  function configurado() {
    return elegido;
  }

  function vigente() {
    return elegido ? actual : null;
  }

  function suscribir(oyente) {
    oyentes.push(oyente);
  }

  function presetActual() {
    const encontrado = presets.filter(function (preset) {
      return Object.keys(preset.valores).every(function (clave) {
        return preset.valores[clave] === actual[clave];
      });
    })[0];
    return encontrado ? encontrado.id : null;
  }

  function resumen(perfil) {
    const datos = perfil || actual;
    const partes = ['tipo', 'almacenamiento', 'memoria', 'firmware'].map(function (clave) {
      return etiquetaOpcion(clave, datos[clave]);
    });
    if (datos.tipo === 'portatil') partes.push('Batería ' + etiquetaOpcion('bateria', datos.bateria).toLowerCase());
    return partes;
  }

  Manual.dominio.perfil = {
    leer: leer,
    establecer: establecer,
    configurado: configurado,
    vigente: vigente,
    suscribir: suscribir,
    presetActual: presetActual,
    etiquetaOpcion: etiquetaOpcion,
    resumen: resumen
  };
})();
