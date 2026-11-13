(function () {
  'use strict';

  const Manual = window.Manual;
  const PATRON = /^#ficha-([PC]-\d{2})$/;

  let empujadas = 0;
  let cerrando = false;

  function quitarAncla() {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function leer() {
    const coincidencia = window.location.hash.match(PATRON);
    return coincidencia ? coincidencia[1] : null;
  }

  function registrar(id, yaAbierta) {
    const hash = '#ficha-' + id;
    if (yaAbierta) {
      window.history.replaceState({ ficha: id, nivel: empujadas }, '', hash);
      return;
    }
    empujadas += 1;
    window.history.pushState({ ficha: id, nivel: empujadas }, '', hash);
  }

  function salir(cerrar) {
    if (empujadas > 0) {
      const pasos = empujadas;
      empujadas = 0;
      cerrando = true;
      window.history.go(-pasos);
      return;
    }
    quitarAncla();
    cerrar();
  }

  function alNavegar(alAbrir, alCerrar) {
    window.addEventListener('popstate', function () {
      const id = leer();
      if (cerrando) {
        cerrando = false;
        if (id) quitarAncla();
        alCerrar();
        return;
      }
      if (id && Manual.dominio.procedimientos.buscar(id)) {
        const estado = window.history.state;
        empujadas = estado && estado.nivel ? estado.nivel : 0;
        alAbrir(id);
      } else {
        empujadas = 0;
        alCerrar();
      }
    });
  }

  Manual.modulos.ficha.historial = { leer: leer, registrar: registrar, salir: salir, alNavegar: alNavegar };
})();
