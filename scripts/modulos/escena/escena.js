(function () {
  'use strict';

  const Manual = window.Manual;
  const dom = Manual.nucleo.dom;
  const crearSvg = dom.crearSvg;
  const medidas = Manual.isometrico.medidas;
  const escena = Manual.modulos.escena;
  const ctx = escena.contexto;

  const NOMBRES_GENERICOS = [
    { patron: /^(Disco duro|SSD)/, nombre: 'Almacenamiento' },
    { patron: /^Memoria RAM/, nombre: 'Memoria RAM' },
    { patron: /^Batería/, nombre: 'Batería' }
  ];

  let tipoActual = null;
  let tipoVista = null;
  let primeraVez = true;

  function tipoInicial() {
    return window.matchMedia('(min-width: 960px)').matches ? 'escritorio' : 'portatil';
  }

  function perfilDeVista() {
    const perfil = Manual.dominio.perfil;
    if (perfil.configurado()) return perfil.leer();
    return Object.assign({}, perfil.leer(), { tipo: tipoVista || tipoInicial() });
  }

  function generalizar(pieza) {
    NOMBRES_GENERICOS.forEach(function (regla) {
      if (regla.patron.test(pieza.nombre)) pieza.nombre = regla.nombre;
    });
  }

  function cargarModelo(perfil) {
    const generico = !Manual.dominio.perfil.configurado();
    ctx.piezas = Manual.datos.modelos[perfil.tipo](perfil);
    ctx.piezas.forEach(function (pieza) {
      pieza.elevar = Math.round(pieza.elevar * escena.constantes.FACTOR_EXPLOSION);
      if (generico) generalizar(pieza);
    });
    ctx.centro = medidas.centroDe(ctx.piezas);
    ctx.progresos = {};
    ctx.piezas.forEach(function (pieza) {
      ctx.progresos[pieza.id] = { v: 0 };
    });
  }

  function ajustarVista() {
    const l = medidas.limites(ctx.piezas, ctx.centro);
    const m = escena.constantes.MARGEN_VISTA;
    ctx.svg.setAttribute('viewBox', [l.minX - m, l.minY - m, l.maxX - l.minX + m * 2, l.maxY - l.minY + m * 2].join(' '));
  }

  function dibujarHuella() {
    const desenfoque = crearSvg('filter', { id: 'sombra-equipo', x: '-20%', y: '-20%', width: '140%', height: '140%' }, [
      crearSvg('feGaussianBlur', { stdDeviation: '10' })
    ]);
    ctx.svg.appendChild(crearSvg('defs', {}, [desenfoque]));
    ctx.nodoHuella = crearSvg('polygon', { class: 'huella', filter: 'url(#sombra-equipo)' });
    ctx.svg.appendChild(ctx.nodoHuella);
  }

  function dibujarPiezas() {
    const ordenadas = escena.ordenadasPorAltura();
    ordenadas.forEach(function (pieza) {
      ctx.svg.appendChild(escena.piezas.construir(pieza, ctx.piezas.indexOf(pieza) + 1));
    });
    ctx.capaMarcas = crearSvg('g', { class: 'capa-marcas' });
    ordenadas.forEach(function (pieza) {
      ctx.capaMarcas.appendChild(ctx.nodos[pieza.id].posicionGlobo);
    });
    ctx.svg.appendChild(ctx.capaMarcas);
    escena.pintor.reiniciarOrden();
  }

  function reconstruir() {
    const perfil = perfilDeVista();
    const cambioDeModelo = tipoActual !== perfil.tipo;
    tipoActual = perfil.tipo;

    escena.desarme.detener();
    dom.vaciar(ctx.svg);
    ctx.nodos = {};

    cargarModelo(perfil);
    ajustarVista();
    dibujarHuella();
    dibujarPiezas();
    escena.marcas.medirRotulos();
    escena.marcas.ajustar();
    escena.seleccion.conservarSiExiste();

    if (ctx.sinMovimiento) {
      escena.desarme.mostrarDesarmado();
    } else {
      escena.desarme.vincularAlScroll();
      if (primeraVez || cambioDeModelo) escena.desarme.entrada();
    }
    primeraVez = false;
  }

  function iniciar() {
    ctx.svg = dom.$('#dibujo');
    ctx.detalle = dom.$('#pieza-detalle');
    ctx.seccion = dom.$('#inicio');
    if (!ctx.svg || !ctx.seccion) return;
    ctx.sinMovimiento = !Manual.nucleo.movimiento.animable();
    if (Manual.nucleo.movimiento.gsapDisponible()) window.gsap.registerPlugin(window.ScrollTrigger);
    if (ctx.sinMovimiento) ctx.seccion.classList.add('escena--estatica');

    window.addEventListener('resize', escena.marcas.ajustar);
    Manual.dominio.perfil.suscribir(reconstruir);
    reconstruir();
    escena.controles.activar();
    escena.giro.activar();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        escena.marcas.medirRotulos();
        escena.pintor.pintar();
      });
    }
  }

  function verTipo(tipo) {
    tipoVista = tipo;
    reconstruir();
  }

  function tipoVisible() {
    return tipoActual;
  }

  escena.iniciar = iniciar;
  escena.verTipo = verTipo;
  escena.tipoVisible = tipoVisible;
})();
