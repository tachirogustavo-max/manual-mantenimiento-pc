(function () {
  'use strict';

  const Manual = window.Manual;
  const crear = Manual.nucleo.dom.crear;
  const ID_FIRMWARE = 'H-BIOS';

  function descripcionCondicion(solo) {
    return Object.keys(solo)
      .map((campo) => solo[campo].map((valor) => Manual.dominio.perfil.etiquetaOpcion(campo, valor)).join(' o '))
      .join(', ');
  }

  function enlaceVer(destinoId) {
    const destino = destinoId === ID_FIRMWARE ? null : Manual.dominio.procedimientos.buscar(destinoId);
    const texto = destino ? `Abrir ${destino.id}: ${destino.titulo}` : 'Ver las teclas de acceso al firmware';
    return crear('button', { clase: 'enlace-boton', type: 'button', 'data-ver': destinoId, texto: texto });
  }

  function etiquetas(paso, oculto) {
    const lista = [];
    if (paso.nivel === 'tecnico') lista.push(crear('span', { clase: 'etiqueta etiqueta--tecnico', texto: 'Nivel técnico' }));
    const sinEquipo = !Manual.dominio.perfil.configurado();
    if ((oculto || sinEquipo) && paso.solo) lista.push(crear('span', { clase: 'etiqueta', texto: `Solo si: ${descripcionCondicion(paso.solo)}` }));
    return lista.length ? crear('div', { clase: 'paso__etiquetas' }, lista) : null;
  }

  function crearPaso(elemento, procedimiento, numero, hecho, oculto) {
    const paso = elemento.paso;
    const identificador = `paso-${procedimiento.id}-${elemento.indice}`;
    const entrada = crear('input', { clase: 'paso__entrada', type: 'checkbox', id: identificador, 'data-indice': String(elemento.indice) });
    entrada.checked = hecho;
    entrada.disabled = oculto;

    const etiqueta = oculto ? 'Paso de otra configuración' : `Marcar el paso ${numero} como hecho`;
    const marca = crear('label', { clase: 'paso__marca', for: identificador, 'aria-label': etiqueta }, [
      crear('span', { clase: 'paso__numero', texto: oculto ? '–' : String(numero) })
    ]);

    const contenido = crear('div', {}, [
      crear('p', { clase: 'paso__texto', texto: paso.texto }),
      paso.detalle ? crear('p', { clase: 'paso__detalle', texto: paso.detalle }) : null,
      paso.comando ? Manual.componentes.comando.crear(paso.comando) : null,
      paso.ver ? enlaceVer(paso.ver) : null,
      etiquetas(paso, oculto)
    ]);

    const clase = 'paso' + (oculto ? ' paso--otro-perfil' : '') + (hecho ? ' paso--hecho' : '');
    return crear('li', { clase: clase }, [entrada, marca, contenido]);
  }

  Manual.modulos.ficha.paso = { crear: crearPaso, ID_FIRMWARE: ID_FIRMWARE };
})();
