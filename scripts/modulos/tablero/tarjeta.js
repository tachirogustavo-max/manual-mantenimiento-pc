(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crear = dom.crear;
  const procedimientos = Manual.dominio.procedimientos;
  const visuales = Manual.datos.visuales;

  function rutaFoto(id, perfil) {
    const regla = visuales.fotos[id];
    const nombre = typeof regla === 'string' ? regla : regla[perfil ? perfil.tipo : 'escritorio'];
    return visuales.carpetaFotos + nombre + '.jpg';
  }

  function insignia(id) {
    return crear('span', { clase: 'tarjeta__insignia', 'aria-hidden': 'true' }, [
      Manual.componentes.icono.crear(visuales.iconos[id])
    ]);
  }

  function barraAvance(avance) {
    return crear('span', { clase: 'tarjeta__avance', role: 'img', 'aria-label': `${avance.completados} de ${avance.total} pasos hechos` }, [
      crear('span', { style: `transform:scaleX(${avance.porcentaje / 100})` })
    ]);
  }

  function construir(p, perfil) {
    const aplica = procedimientos.aplica(p, perfil);
    const avance = procedimientos.avance(p, perfil);
    const foto = crear('img', { clase: 'tarjeta__foto', src: rutaFoto(p.id, perfil), alt: '', width: '1200', height: '900', loading: 'lazy', decoding: 'async' });

    const boton = crear('button', { clase: 'tarjeta__boton', type: 'button', 'data-ficha-abrir': p.id, 'aria-disabled': aplica ? null : 'true' }, [
      crear('span', { clase: 'tarjeta__visual' }, [foto, insignia(p.id)]),
      crear('span', { clase: 'tarjeta__cuerpo' }, [
        crear('span', { clase: 'tarjeta__fila' }, [crear('span', { clase: 'tarjeta__codigo mono', texto: p.id }), Manual.componentes.sello.crear(p.riesgo)]),
        crear('span', { clase: 'tarjeta__titulo', texto: p.titulo }),
        crear('span', { clase: 'tarjeta__meta', texto: aplica ? p.duracion : procedimientos.motivoNoAplica(p) }),
        aplica && avance.completados > 0 ? barraAvance(avance) : null
      ])
    ]);

    return crear('li', { clase: 'tarjeta' + (aplica ? '' : ' tarjeta--no-aplica') }, [boton]);
  }

  Manual.modulos.tablero.tarjeta = { construir: construir };
})();
