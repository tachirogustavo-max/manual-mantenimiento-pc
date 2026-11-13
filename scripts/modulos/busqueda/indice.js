(function () {
  'use strict';

  const Manual = window.Manual;
  const datos = Manual.datos;
  const LARGO_FRAGMENTO = 90;
  const CONTEXTO_FRAGMENTO = 40;

  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function terminos(consulta) {
    return normalizar(consulta).split(/\s+/).filter(Boolean);
  }

  function textoPasos(p) {
    return p.pasos
      .map(function (paso) {
        return [paso.texto, paso.detalle || '', [].concat(paso.comando || []).join(' ')].join(' ');
      })
      .join(' ');
  }

  function textoTabla(tabla) {
    return tabla.filas
      .map(function (fila) {
        return fila.join(' ');
      })
      .join(' ');
  }

  function desdeProcedimiento(p) {
    return {
      tipo: Manual.dominio.procedimientos.nombreTipo(p),
      codigo: p.id,
      titulo: p.titulo,
      resumen: p.resumen,
      cuerpo: [p.resumen, (p.advertencias || []).join(' '), (p.herramientas || []).join(' '), textoPasos(p), p.tabla ? textoTabla(p.tabla) : ''].join(' '),
      destino: { ficha: p.id }
    };
  }

  function desdeFirmware(t) {
    return {
      tipo: 'Herramienta',
      codigo: 'BIOS',
      titulo: 'Teclas de ' + t.fabricante,
      resumen: 'Configuración: ' + t.configuracion + '. Menú de arranque: ' + t.menuArranque + '.',
      cuerpo: 'bios uefi firmware arranque boot ' + t.fabricante + ' ' + t.configuracion + ' ' + t.menuArranque + ' ' + t.nota,
      destino: { seccion: '#herramientas-firmware' }
    };
  }

  function desdeAtajo(a) {
    return { tipo: 'Sección', codigo: '', titulo: a.titulo, resumen: a.resumen, cuerpo: a.resumen + ' ' + a.claves, destino: { seccion: a.destino } };
  }

  function construir() {
    return Manual.dominio.procedimientos.todos
      .map(desdeProcedimiento)
      .concat(datos.referencias.teclasFirmware.map(desdeFirmware))
      .concat(datos.busqueda.atajos.map(desdeAtajo))
      .map(function (item) {
        item.tituloNormal = normalizar(item.titulo + ' ' + item.codigo);
        item.cuerpoNormal = normalizar(item.cuerpo);
        return item;
      });
  }

  function puntuar(item, lista) {
    let puntos = 0;
    const todos = lista.every((termino) => {
      const enTitulo = item.tituloNormal.includes(termino);
      const enCuerpo = item.cuerpoNormal.includes(termino);
      if (enTitulo) puntos += 5;
      if (enCuerpo) puntos += 1;
      return enTitulo || enCuerpo;
    });
    return todos ? puntos : 0;
  }

  function buscar(indice, consulta) {
    const lista = terminos(consulta);
    if (!lista.length) return [];
    return indice
      .map((item) => ({ item: item, puntos: puntuar(item, lista) }))
      .filter((r) => r.puntos > 0)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, datos.busqueda.maximo)
      .map((r) => r.item);
  }

  function fragmento(item, consulta) {
    const lista = terminos(consulta);
    const texto = item.cuerpo.replace(/\s+/g, ' ');
    const normal = normalizar(texto);
    let posicion = -1;
    lista.some((t) => {
      if (item.tituloNormal.includes(t)) return false;
      posicion = normal.indexOf(t);
      return posicion !== -1;
    });
    if (posicion === -1) return item.resumen;
    const inicio = Math.max(0, posicion - CONTEXTO_FRAGMENTO);
    const fin = posicion + LARGO_FRAGMENTO;
    return (inicio > 0 ? '…' : '') + texto.slice(inicio, fin).trim() + (fin < texto.length ? '…' : '');
  }

  Manual.modulos.busqueda.indice = { construir: construir, buscar: buscar, fragmento: fragmento };
})();
