(function () {
  'use strict';

  const VINO = '#6b172a';
  const ORO = '#f2c75d';
  const MARFIL = '#fff6e7';
  const CARMIN = '#c7283e';
  const OSCURO = '#3a1019';
  const VINO_CLARO = '#8d1930';
  const CREMA = '#f2e5ce';
  Manual.datos.modelos = {
    portatil: function (perfil) {
      const almacenamiento = {
        hdd: {
          nombre: 'Disco duro (HDD)',
          material: 'marfil',
          caja: { x: 36, y: 20, z: 9, an: 86, pr: 60, al: 9 },
          adornos: [
            { tipo: 'ventilador', cx: 72, cy: 50, z: 18, r: 22, relleno: CREMA, aspas: 'rgba(107, 23, 42, 0.35)' },
            { tipo: 'cuadro', x: 98, y: 26, z: 18, an: 18, pr: 48, relleno: CARMIN, borde: 'none' }
          ],
          descripcion:
            'Unidad mecánica con platos giratorios. Es sensible a golpes y vibraciones. Si hace clics repetidos, está dañado: apaga el equipo y no corras reparaciones.'
        },
        ssd_sata: {
          nombre: 'SSD SATA',
          material: 'marfil',
          caja: { x: 36, y: 20, z: 9, an: 86, pr: 60, al: 7 },
          adornos: [{ tipo: 'cuadro', x: 44, y: 30, z: 16, an: 50, pr: 40, relleno: CARMIN, borde: 'none' }],
          descripcion: 'Disco de estado sólido de 2,5 pulgadas con conexión SATA. Su estado lo ves con SMART y debe tener TRIM activo.'
        },
        nvme: {
          nombre: 'SSD NVMe (M.2)',
          material: 'vino',
          caja: { x: 36, y: 22, z: 9, an: 68, pr: 19, al: 3 },
          adornos: [
            { tipo: 'cuadro', x: 44, y: 25, z: 12, an: 22, pr: 13, relleno: ORO, borde: 'none' },
            { tipo: 'cuadro', x: 72, y: 25, z: 12, an: 12, pr: 13, relleno: MARFIL, borde: 'none' },
            { tipo: 'cuadro', x: 87, y: 25, z: 12, an: 12, pr: 13, relleno: MARFIL, borde: 'none' }
          ],
          descripcion: 'Módulo M.2 que va conectado por PCIe. Entra en ángulo y se fija con un tornillo sobre su separador. Su salud la ves con la utilidad del fabricante.'
        }
      }[perfil.almacenamiento];

      const ranuraMemoria = { ddr3: '204 pines', ddr4: '260 pines', ddr5: '262 pines' }[perfil.memoria];
      const bateriaRemovible = perfil.bateria === 'removible';

      function chipsMemoria(y, caja) {
        return [0, 1, 2, 3].map(function (i) {
          return { tipo: 'cuadro', x: 220 + i * 15, y: y + 3, z: 13, an: 11, pr: 10, relleno: VINO, borde: 'none', caja: caja };
        });
      }

      return [
        {
          id: 'base',
          nombre: 'Tapa inferior',
          material: 'marfil',
          capa: -1,
          descripcion: 'Quítale los tornillos para llegar a la batería, la memoria, el almacenamiento y el ventilador. Hazlo siempre con el equipo apagado y desconectado.',
          procedimientos: ['P-01', 'P-02'],
          elevar: 0,
          cajas: [{ x: 0, y: 0, z: 0, an: 300, pr: 200, al: 6 }],
          adornos: [
            { tipo: 'lineas', eje: 'x', z: 6, desde: [178, 70], hasta: [250, 104], n: 12, color: 'rgba(107, 23, 42, 0.5)', ancho: 1.6 },
            { tipo: 'puntos', z: 6, r: 3.4, puntos: [[12, 12], [288, 12], [12, 188], [288, 188], [150, 12]] }
          ]
        },
        {
          id: 'bateria',
          nombre: bateriaRemovible ? 'Batería removible' : 'Batería integrada',
          material: 'carmin',
          descripcion: bateriaRemovible
            ? 'Sale con los pestillos de afuera. Quítala antes de abrir el equipo.'
            : 'Va dentro del chasis. Antes de tocar nada, desactívala desde la UEFI y desconéctala de la placa. Si está hinchada, no la manipules.',
          procedimientos: ['P-06', 'C-08'],
          elevar: 34,
          cajas: [{ x: 28, y: 128, z: 6, an: 200, pr: 62, al: 8 }],
          adornos: [
            { tipo: 'lineas', eje: 'x', z: 14, desde: [28, 128], hasta: [228, 190], n: 4, color: 'rgba(255, 246, 231, 0.55)', ancho: 1.2 },
            { tipo: 'cuadro', x: 40, y: 138, z: 14, an: 30, pr: 16, relleno: MARFIL, borde: 'none' }
          ]
        },
        {
          id: 'placa',
          nombre: 'Placa base',
          material: 'oro',
          descripcion: 'Aloja el firmware (BIOS o UEFI), el procesador y los conectores. Una falla aquí suele exigir cambiar la placa completa.',
          procedimientos: ['P-07', 'C-01', 'C-02'],
          elevar: 66,
          globo: { punto: [8, 118, 9], dx: -18, dy: -8 },
          cajas: [{ x: 8, y: 8, z: 6, an: 284, pr: 110, al: 3 }],
          adornos: [
            {
              tipo: 'trazas',
              z: 9,
              rutas: [
                [[110, 88], [124, 88], [124, 76], [132, 76]],
                [[110, 96], [128, 96], [128, 90], [132, 90]],
                [[168, 70], [178, 60], [208, 60], [208, 50]],
                [[150, 106], [150, 112], [260, 112]],
                [[20, 100], [60, 100], [70, 90], [100, 90]],
                [[20, 108], [64, 108], [74, 98], [100, 98]]
              ]
            },
            { tipo: 'cuadro', x: 132, y: 70, z: 9, an: 36, pr: 36, relleno: VINO, borde: 'none' },
            { tipo: 'cuadro', x: 96, y: 84, z: 9, an: 14, pr: 18, relleno: VINO, borde: 'none' },
            { tipo: 'cuadro', x: 250, y: 74, z: 9, an: 22, pr: 22, relleno: VINO, borde: 'none' },
            { tipo: 'cuadro', x: 14, y: 30, z: 9, an: 10, pr: 28, relleno: MARFIL, borde: 'none' }
          ]
        },
        {
          id: 'wlan',
          nombre: 'Tarjeta Wi-Fi',
          material: 'beige',
          descripcion: 'Módulo M.2 con dos cables de antena. Sus conectores son frágiles: conéctalos y desconéctalos en línea recta, sin hacer palanca.',
          procedimientos: ['C-07'],
          elevar: 96,
          cajas: [{ x: 140, y: 22, z: 9, an: 40, pr: 16, al: 2.5 }],
          adornos: [
            { tipo: 'cuadro', x: 146, y: 25, z: 11.5, an: 14, pr: 10, relleno: VINO, borde: 'none' },
            { tipo: 'puntos', z: 11.5, r: 2.6, relleno: CARMIN, puntos: [[172, 26], [172, 34]] },
            { tipo: 'trazas', z: 11.5, color: CARMIN, rutas: [[[172, 26], [184, 22], [196, 22]], [[172, 34], [184, 36], [196, 36]]] }
          ]
        },
        {
          id: 'almacenamiento',
          nombre: almacenamiento.nombre,
          material: almacenamiento.material,
          descripcion: almacenamiento.descripcion,
          procedimientos: ['P-05', 'P-04', 'C-06'],
          elevar: 128,
          cajas: [almacenamiento.caja],
          adornos: almacenamiento.adornos
        },
        {
          id: 'ram',
          nombre: 'Memoria RAM ' + perfil.memoria.toUpperCase(),
          material: 'marfil',
          descripcion:
            'Módulos SODIMM de ' + ranuraMemoria + '. La muesca impide poner una generación equivocada. Entran en ángulo y luego los bajas hasta que los clips los sujetan.',
          procedimientos: ['P-08', 'C-02'],
          elevar: 128,
          cajas: [
            { x: 216, y: 14, z: 9, an: 66, pr: 16, al: 4 },
            { x: 216, y: 34, z: 9, an: 66, pr: 16, al: 4 }
          ],
          adornos: chipsMemoria(14, 0)
            .concat(chipsMemoria(34, 1))
            .concat([
              { tipo: 'cuadro', x: 216, y: 27, z: 13, an: 66, pr: 3, relleno: ORO, borde: 'none' },
              { tipo: 'cuadro', x: 216, y: 47, z: 13, an: 66, pr: 3, relleno: ORO, borde: 'none', caja: 1 }
            ])
        },
        {
          id: 'disipador',
          nombre: 'Ventilador y disipador',
          material: 'marfil',
          descripcion:
            'Sacan el calor del procesador por un tubo de cobre. El polvo en las aletas y la pasta térmica seca elevan la temperatura.',
          procedimientos: ['P-02', 'P-03', 'C-03'],
          elevar: 150,
          mover: [24, 40],
          cajas: [
            { x: 132, y: 70, z: 9, an: 36, pr: 36, al: 3, material: 'oro' },
            { x: 168, y: 82, z: 9, an: 14, pr: 14, al: 3, material: 'oro' },
            { x: 182, y: 60, z: 9, an: 56, pr: 50, al: 9 }
          ],
          adornos: [{ tipo: 'ventilador', cx: 210, cy: 85, z: 18, r: 21, caja: 2 }]
        },
        {
          id: 'cubierta',
          nombre: 'Teclado y pantalla',
          material: 'marfil',
          descripcion:
            'La cubierta con el teclado sale de última y en muchos modelos tienes que soltar cables planos. La pantalla va conectada por un cable que pasa por la bisagra.',
          procedimientos: ['P-01'],
          elevar: 170,
          mover: [-10, -200],
          cajas: [
            { x: 0, y: 0, z: 19, an: 300, pr: 200, al: 6 },
            { x: 0, y: -8, z: 25, an: 300, pr: 8, al: 150 }
          ],
          adornos: [
            { tipo: 'teclas', x: 20, y: 18, z: 25, an: 260, pr: 98, filas: 6, columnas: 15 },
            { tipo: 'cuadro', x: 104, y: 128, z: 25, an: 92, pr: 56, relleno: CREMA, borde: 'rgba(107, 23, 42, 0.45)' },
            { tipo: 'pantalla', x0: 12, x1: 288, y: 0, z0: 36, z1: 166, caja: 1 }
          ]
        }
      ];
    },

    escritorio: function (perfil) {
      const enPlaca = perfil.almacenamiento === 'nvme';
      const nombres = { hdd: 'Disco duro (HDD)', ssd_sata: 'SSD SATA', nvme: 'SSD NVMe (M.2)' };
      const descripciones = {
        hdd: 'Unidad mecánica de 3,5 pulgadas con cables de datos y de alimentación SATA. Clics repetidos indican daño mecánico.',
        ssd_sata: 'Unidad de estado sólido de 2,5 pulgadas con cables de datos y de alimentación SATA. Debe tener TRIM activo.',
        nvme: 'Módulo M.2 sobre la placa base. Entra en ángulo y se fija con un tornillo sobre su separador. Si trae disipador, quítale el plástico protector a la almohadilla.'
      };

      const almacenamiento = enPlaca
        ? {
            id: 'almacenamiento',
            nombre: nombres.nvme,
            material: 'vino',
            descripcion: descripciones.nvme,
            procedimientos: ['P-05', 'P-04', 'C-06'],
            elevar: 0,
            mover: [150, 40],
            cajas: [{ x: 14, y: 110, z: 250, an: 4, pr: 70, al: 20 }],
            adornos: [
              {
                tipo: 'lateral',
                x: 18,
                elementos: [
                  { y0: 116, z0: 253, y1: 138, z1: 267, relleno: MARFIL },
                  { y0: 144, z0: 254, y1: 168, z1: 266, relleno: ORO },
                  { y0: 172, z0: 256, y1: 177, z1: 264, relleno: ORO }
                ]
              }
            ]
          }
        : {
            id: 'almacenamiento',
            nombre: nombres[perfil.almacenamiento],
            material: 'marfil',
            descripcion: descripciones[perfil.almacenamiento],
            procedimientos: ['P-05', 'P-04', 'C-06'],
            elevar: 0,
            mover: [40, 220],
            cajas: [{ x: 40, y: 290, z: 12, an: 120, pr: 100, al: perfil.almacenamiento === 'hdd' ? 28 : 10 }],
            adornos: [{ tipo: 'cuadro', x: 55, y: 305, z: perfil.almacenamiento === 'hdd' ? 40 : 22, an: 60, pr: 50, relleno: CARMIN, borde: 'none' }]
          };

      return [
        {
          id: 'base',
          nombre: 'Chasis',
          material: 'beige',
          descripcion: 'Estructura del gabinete. Los filtros antipolvo y los ventiladores de entrada y salida definen el flujo de aire.',
          procedimientos: ['P-01', 'P-02'],
          elevar: 0,
          capa: -2,
          cajas: [
            { x: 0, y: 0, z: 0, an: 200, pr: 420, al: 10 },
            { x: 0, y: 0, z: 10, an: 8, pr: 420, al: 430 },
            { x: 8, y: 0, z: 10, an: 192, pr: 8, al: 430 }
          ],
          adornos: [{ tipo: 'puntos', z: 10, r: 4, relleno: VINO, puntos: [[20, 20], [180, 20], [20, 400], [180, 400]] }]
        },
        {
          id: 'placa',
          nombre: 'Placa base',
          material: 'oro',
          descripcion: 'Aloja el firmware, el procesador, las ranuras de memoria y los conectores. Mantiene una línea de +5 V en espera aunque el equipo esté apagado.',
          procedimientos: ['P-07', 'C-01', 'C-02'],
          elevar: 0,
          mover: [40, 0],
          capa: -1,
          globo: { punto: [14, 40, 420], dx: -10, dy: -14 },
          cajas: [{ x: 8, y: 40, z: 110, an: 6, pr: 300, al: 310 }],
          adornos: [
            {
              tipo: 'lateral',
              x: 14,
              rutas: [
                [[228, 340], [250, 340], [250, 300], [258, 300]],
                [[228, 320], [242, 320], [242, 262], [300, 262]],
                [[180, 292], [180, 244], [220, 244], [220, 176]],
                [[70, 230], [110, 230], [122, 218], [210, 218]],
                [[256, 158], [300, 158], [312, 146], [320, 146]],
                [[60, 300], [60, 250], [96, 250], [104, 258]]
              ],
              elementos: [
                { y0: 132, z0: 292, y1: 228, z1: 388, relleno: VINO },
                { y0: 148, z0: 308, y1: 212, z1: 372, relleno: VINO_CLARO },
                { y0: 258, z0: 286, y1: 264, z1: 414, relleno: VINO },
                { y0: 274, z0: 286, y1: 280, z1: 414, relleno: VINO },
                { y0: 290, z0: 286, y1: 296, z1: 414, relleno: VINO },
                { y0: 306, z0: 286, y1: 312, z1: 414, relleno: VINO },
                { y0: 70, z0: 198, y1: 300, z1: 206, relleno: VINO },
                { y0: 70, z0: 160, y1: 150, z1: 166, relleno: VINO },
                { y0: 104, z0: 256, y1: 110, z1: 266, relleno: VINO },
                { y0: 220, z0: 140, y1: 256, z1: 176, relleno: VINO },
                { y0: 322, z0: 290, y1: 334, z1: 360, relleno: VINO },
                { y0: 320, z0: 130, y1: 334, z1: 142, relleno: MARFIL },
                { y0: 320, z0: 146, y1: 334, z1: 158, relleno: MARFIL },
                { y0: 42, z0: 330, y1: 58, z1: 410, relleno: MARFIL },
                { y: 184, z: 261, r: 3, relleno: MARFIL },
                { y: 170, z: 140, r: 9, relleno: MARFIL },
                { y: 50, z: 122, r: 4, relleno: VINO },
                { y: 330, z: 122, r: 4, relleno: VINO },
                { y: 50, z: 410, r: 4, relleno: VINO },
                { y: 330, z: 410, r: 4, relleno: VINO }
              ]
            }
          ]
        },
        {
          id: 'fuente',
          nombre: 'Fuente de poder',
          material: 'carmin',
          descripcion: 'Convierte la corriente alterna en +12 V, +5 V y +3,3 V. Guarda tensiones letales: nunca la abras; si falla, se cambia completa.',
          procedimientos: ['C-01', 'P-01'],
          elevar: 0,
          mover: [170, -40],
          cajas: [{ x: 8, y: 14, z: 10, an: 150, pr: 150, al: 86 }],
          adornos: [{ tipo: 'ventilador', cx: 83, cy: 89, z: 96, r: 52, relleno: VINO, aspas: MARFIL }]
        },
        almacenamiento,
        {
          id: 'gpu',
          nombre: 'Tarjeta gráfica',
          material: 'marfil',
          descripcion: 'Si el equipo la tiene, usa conectores de alimentación propios. Tiene que entrar hasta el fondo de la ranura; revísala primero cuando no hay imagen.',
          procedimientos: ['C-02', 'C-03'],
          elevar: 0,
          mover: [220, 60],
          cajas: [{ x: 14, y: 60, z: 190, an: 150, pr: 250, al: 34 }],
          adornos: [
            { tipo: 'ventilador', cx: 90, cy: 130, z: 224, r: 44, relleno: VINO, aspas: MARFIL },
            { tipo: 'ventilador', cx: 90, cy: 240, z: 224, r: 44, relleno: VINO, aspas: MARFIL }
          ]
        },
        {
          id: 'ram',
          nombre: 'Memoria RAM ' + perfil.memoria.toUpperCase(),
          material: 'marfil',
          descripcion:
            'Con dos módulos en una placa de cuatro ranuras, usa A2 y B2: la segunda y la cuarta contando desde el procesador. Presiona los dos extremos hasta oír el clic.',
          procedimientos: ['P-08', 'C-02'],
          elevar: 0,
          mover: [130, 70],
          cajas: [
            { x: 14, y: 274, z: 290, an: 34, pr: 6, al: 120 },
            { x: 14, y: 306, z: 290, an: 34, pr: 6, al: 120 }
          ],
          adornos: [
            { tipo: 'cuadro', x: 14, y: 274, z: 410, an: 34, pr: 6, relleno: ORO, borde: 'none' },
            { tipo: 'cuadro', x: 14, y: 306, z: 410, an: 34, pr: 6, relleno: ORO, borde: 'none', caja: 1 }
          ]
        },
        {
          id: 'disipador',
          nombre: 'Procesador y disipador',
          material: 'marfil',
          descripcion: 'La pasta térmica lo deja pegado al procesador. Para quitarlo, gíralo un poco antes de levantarlo.',
          procedimientos: ['P-02', 'P-03', 'C-03'],
          elevar: 0,
          mover: [200, 0],
          cajas: [
            { x: 14, y: 140, z: 300, an: 16, pr: 80, al: 80, material: 'oro' },
            { x: 30, y: 140, z: 300, an: 100, pr: 80, al: 80 }
          ],
          adornos: [
            { tipo: 'lineas', eje: 'x', z: 380, desde: [30, 140], hasta: [130, 220], n: 12, color: 'rgba(107, 23, 42, 0.45)', caja: 1 },
            { tipo: 'ventiladorLateral', cx: 80, cz: 340, y: 220, r: 34, caja: 1 }
          ]
        },
        {
          id: 'cubierta',
          nombre: 'Paneles del gabinete',
          material: 'marfil',
          descripcion: 'Quita el panel lateral para llegar al interior, siempre con el cable de corriente desconectado.',
          procedimientos: ['P-01'],
          elevar: 0,
          mover: [320, -470],
          capa: 1,
          cajas: [
            { x: 200, y: 0, z: 0, an: 6, pr: 426, al: 446 },
            { x: 0, y: 420, z: 0, an: 200, pr: 6, al: 446 },
            { x: 0, y: 0, z: 440, an: 200, pr: 420, al: 6 }
          ],
          adornos: [
            { tipo: 'lineas', eje: 'x', z: 446, desde: [40, 60], hasta: [160, 200], n: 10, color: 'rgba(107, 23, 42, 0.45)', ancho: 1.6, caja: 2 },
            { tipo: 'puntos', z: 446, r: 7, relleno: VINO, puntos: [[100, 380]], caja: 2 },
            {
              tipo: 'frente',
              y: 426,
              caja: 1,
              elementos: [
                { x0: 30, z0: 40, x1: 170, z1: 58, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 70, x1: 170, z1: 88, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 100, x1: 170, z1: 118, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 130, x1: 170, z1: 148, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 160, x1: 170, z1: 178, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 190, x1: 170, z1: 208, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 220, x1: 170, z1: 238, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 250, x1: 170, z1: 268, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x0: 30, z0: 280, x1: 170, z1: 298, relleno: 'rgba(107, 23, 42, 0.16)' },
                { x: 100, z: 405, r: 11, relleno: VINO },
                { x: 100, z: 405, r: 4, relleno: ORO },
                { x0: 60, z0: 360, x1: 76, z1: 368, relleno: OSCURO },
                { x0: 124, z0: 360, x1: 140, z1: 368, relleno: OSCURO }
              ]
            }
          ]
        }
      ];
    }
  };

})();
