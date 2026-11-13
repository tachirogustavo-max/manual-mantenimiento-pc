(function () {
  'use strict';

  const Manual = window.Manual;
  const UMBRAL_DESLIZAMIENTO = 60;
  const PROPORCION_HORIZONTAL = 1.6;

  function activar(cuerpo, estaActivo, avanzar, retroceder) {
    let inicio = null;

    cuerpo.addEventListener('pointerdown', function (evento) {
      if (evento.pointerType === 'mouse' || evento.target.closest('pre')) return;
      inicio = { x: evento.clientX, y: evento.clientY };
    });

    cuerpo.addEventListener('pointerup', function (evento) {
      if (!inicio) return;
      const dx = evento.clientX - inicio.x;
      const dy = evento.clientY - inicio.y;
      inicio = null;
      if (Math.abs(dx) < UMBRAL_DESLIZAMIENTO || Math.abs(dx) < Math.abs(dy) * PROPORCION_HORIZONTAL) return;
      if (dx < 0) avanzar(true);
      else retroceder();
    });

    cuerpo.addEventListener('pointercancel', function () {
      inicio = null;
    });

    document.addEventListener('keydown', function (evento) {
      if (!estaActivo() || evento.target.closest('input, textarea')) return;
      if (evento.key === 'ArrowRight') avanzar(false);
      else if (evento.key === 'ArrowLeft') retroceder();
    });
  }

  Manual.modulos.modoPaso.gestos = { activar: activar };
})();
