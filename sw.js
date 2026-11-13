const VERSION = 'manual-v29';
const ARCHIVOS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "estilos/base/accesibilidad.css",
  "estilos/base/contenedor.css",
  "estilos/base/elementos.css",
  "estilos/base/movimiento_reducido.css",
  "estilos/base/tipografias.css",
  "estilos/base/variables.css",
  "estilos/componentes/utilidades.css",
  "estilos/componentes/icono.css",
  "estilos/componentes/citas.css",
  "estilos/componentes/botones.css",
  "estilos/componentes/chip_perfil.css",
  "estilos/componentes/comando.css",
  "estilos/componentes/etiquetas.css",
  "estilos/componentes/hoja.css",
  "estilos/componentes/paneles.css",
  "estilos/componentes/paneles_adaptable.css",
  "estilos/componentes/sello.css",
  "estilos/componentes/superposicion.css",
  "estilos/componentes/tabla.css",
  "estilos/componentes/tabla_movil.css",
  "estilos/disposicion/barra_inferior.css",
  "estilos/disposicion/cabecera.css",
  "estilos/disposicion/hoja_mas.css",
  "estilos/disposicion/navegacion_adaptable.css",
  "estilos/disposicion/pie.css",
  "estilos/disposicion/progreso_lectura.css",
  "estilos/disposicion/secciones.css",
  "estilos/impresion.css",
  "estilos/modulos/busqueda.css",
  "estilos/modulos/diagnostico/asistente.css",
  "estilos/modulos/diagnostico/respuestas.css",
  "estilos/modulos/diagnostico/acciones.css",
  "estilos/modulos/diagnostico/resultado.css",
  "estilos/modulos/escena/adaptable.css",
  "estilos/modulos/escena/control.css",
  "estilos/modulos/escena/detalle.css",
  "estilos/modulos/escena/dibujo.css",
  "estilos/modulos/escena/escenario.css",
  "estilos/modulos/escena/isometrico.css",
  "estilos/modulos/escena/rotulos.css",
  "estilos/modulos/ficha/acciones.css",
  "estilos/modulos/ficha/avisos.css",
  "estilos/modulos/ficha/cajetin.css",
  "estilos/modulos/ficha/panel.css",
  "estilos/modulos/ficha/pasos.css",
  "estilos/modulos/ficha/pie.css",
  "estilos/modulos/ficha/secciones.css",
  "estilos/modulos/ficha/herramientas.css",
  "estilos/modulos/fuentes.css",
  "estilos/modulos/herramientas/instrumentos.css",
  "estilos/modulos/metodo.css",
  "estilos/modulos/modo_paso/panel.css",
  "estilos/modulos/modo_paso/contenido.css",
  "estilos/modulos/modo_paso/pie.css",
  "estilos/modulos/perfil.css",
  "estilos/modulos/tablero/tarjeta.css",
  "estilos/modulos/tablero/visual.css",
  "datos/busqueda.js",
  "datos/diagnostico.js",
  "datos/fuentes.js",
  "datos/metodo.js",
  "datos/modelos_escena.js",
  "datos/perfiles.js",
  "datos/procedimientos_correctivos.js",
  "datos/procedimientos_preventivos.js",
  "datos/referencias.js",
  "datos/visuales.js",
  "datos/autoria.js",
  "datos/iconos.js",
  "scripts/arranque.js",
  "scripts/componentes/comando.js",
  "scripts/componentes/icono.js",
  "scripts/componentes/citas.js",
  "scripts/componentes/lista.js",
  "scripts/componentes/sello.js",
  "scripts/componentes/tabla.js",
  "scripts/dominio/condiciones.js",
  "scripts/dominio/diagnostico.js",
  "scripts/dominio/perfil.js",
  "scripts/dominio/procedimientos.js",
  "scripts/dominio/progreso.js",
  "scripts/espacio.js",
  "scripts/isometrico/adornos/frente.js",
  "scripts/isometrico/adornos/pantalla.js",
  "scripts/isometrico/adornos/superficie.js",
  "scripts/isometrico/adornos/teclas.js",
  "scripts/isometrico/adornos/ventilador.js",
  "scripts/isometrico/caja.js",
  "scripts/isometrico/geometria.js",
  "scripts/isometrico/materiales.js",
  "scripts/isometrico/medidas.js",
  "scripts/isometrico/pieza.js",
  "scripts/isometrico/primitiva.js",
  "scripts/isometrico/proyeccion.js",
  "scripts/modulos/busqueda/buscador.js",
  "scripts/modulos/busqueda/indice.js",
  "scripts/modulos/diagnostico/animaciones.js",
  "scripts/modulos/diagnostico/diagnostico.js",
  "scripts/modulos/diagnostico/pregunta.js",
  "scripts/modulos/diagnostico/resultado.js",
  "scripts/modulos/escena/contexto.js",
  "scripts/modulos/escena/controles.js",
  "scripts/modulos/escena/desarme.js",
  "scripts/modulos/escena/escena.js",
  "scripts/modulos/escena/giro.js",
  "scripts/modulos/escena/marcas.js",
  "scripts/modulos/escena/piezas.js",
  "scripts/modulos/escena/pintor.js",
  "scripts/modulos/escena/seleccion.js",
  "scripts/modulos/ficha/avance.js",
  "scripts/modulos/ficha/contenido.js",
  "scripts/modulos/ficha/ficha.js",
  "scripts/modulos/ficha/historial.js",
  "scripts/modulos/ficha/paso.js",
  "scripts/modulos/fuentes/fuentes.js",
  "scripts/modulos/herramientas/firmware.js",
  "scripts/modulos/herramientas/herramientas.js",
  "scripts/modulos/metodo/metodo.js",
  "scripts/modulos/modo_paso/gestos.js",
  "scripts/modulos/modo_paso/modo_paso.js",
  "scripts/modulos/modo_paso/pantallas.js",
  "scripts/modulos/navegacion/enlaces.js",
  "scripts/modulos/navegacion/hoja_mas.js",
  "scripts/modulos/navegacion/progreso_lectura.js",
  "scripts/modulos/navegacion/seccion_activa.js",
  "scripts/modulos/perfil/formulario.js",
  "scripts/modulos/perfil/perfil.js",
  "scripts/modulos/tablero/tablero.js",
  "scripts/modulos/tablero/tarjeta.js",
  "scripts/nucleo/almacen.js",
  "scripts/nucleo/desplazamiento.js",
  "scripts/nucleo/dom.js",
  "scripts/nucleo/impresion.js",
  "scripts/nucleo/movimiento.js",
  "scripts/nucleo/pantalla_activa.js",
  "scripts/nucleo/portapapeles.js",
  "scripts/nucleo/sin_conexion.js",
  "scripts/nucleo/superposicion.js",
  "recursos/icono-180.png",
  "recursos/icono-192.png",
  "recursos/icono-512.png",
  "recursos/icono.svg",
  "recursos/fotos/c-01-b.jpg",
  "recursos/fotos/c-01.jpg",
  "recursos/fotos/c-02.jpg",
  "recursos/fotos/c-03.jpg",
  "recursos/fotos/c-04.jpg",
  "recursos/fotos/c-05.jpg",
  "recursos/fotos/c-06.jpg",
  "recursos/fotos/c-07-b.jpg",
  "recursos/fotos/c-08.jpg",
  "recursos/fotos/p-01.jpg",
  "recursos/fotos/p-02.jpg",
  "recursos/fotos/p-03-b.jpg",
  "recursos/fotos/p-04.jpg",
  "recursos/fotos/p-05.jpg",
  "recursos/fotos/p-06.jpg",
  "recursos/fotos/p-07.jpg",
  "recursos/fotos/p-08.jpg",
  "recursos/librerias/ScrollTrigger.min.js",
  "recursos/librerias/gsap.min.js",
  "recursos/tipografias/ibm-plex-mono-400.woff2",
  "recursos/tipografias/ibm-plex-mono-500.woff2",
  "recursos/tipografias/instrument-sans-latin.woff2",
  "recursos/tipografias/source-serif-4-latin.woff2"
];

self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches
      .open(VERSION)
      .then(function (cache) {
        return cache.addAll(
          ARCHIVOS.map(function (ruta) {
            return new Request(ruta, { cache: 'reload' });
          })
        );
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches
      .keys()
      .then(function (claves) {
        return Promise.all(
          claves
            .filter(function (clave) {
              return clave !== VERSION;
            })
            .map(function (clave) {
              return caches.delete(clave);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function (evento) {
  if (evento.request.method !== 'GET') return;
  const url = new URL(evento.request.url);
  if (url.origin !== self.location.origin) return;
  evento.respondWith(
    fetch(evento.request, { cache: 'no-cache' })
      .then(function (respuesta) {
        if (respuesta && respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(VERSION).then(function (cache) {
            cache.put(evento.request, copia);
          });
        }
        return respuesta;
      })
      .catch(function () {
        return caches.match(evento.request, { ignoreSearch: true }).then(function (guardada) {
          return guardada || caches.match('index.html');
        });
      })
  );
});
