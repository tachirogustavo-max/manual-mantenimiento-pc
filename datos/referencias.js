Manual.datos.referencias = {
  teclasFirmware: [
    {
      fabricante: 'Dell',
      configuracion: 'F2',
      menuArranque: 'F12',
      nota: 'F12 también da acceso a la actualización de BIOS y al diagnóstico ePSA.'
    },
    {
      fabricante: 'HP',
      configuracion: 'F10',
      menuArranque: 'Esc, luego F9',
      nota: 'Esc abre el menú de inicio. Desde ahí, F10 abre la configuración y F9 las opciones de arranque.'
    },
    {
      fabricante: 'Lenovo (ThinkPad y ThinkCentre)',
      configuracion: 'F1',
      menuArranque: 'F12',
      nota: 'Línea empresarial.'
    },
    {
      fabricante: 'Lenovo (IdeaPad, Yoga y Legion)',
      configuracion: 'F2 o Fn + F2',
      menuArranque: 'F12 o botón Novo',
      nota: 'El botón Novo es un orificio lateral con una flecha curva. Se usa con el equipo apagado.'
    },
    {
      fabricante: 'ASUS (placa base de escritorio)',
      configuracion: 'Supr o F2',
      menuArranque: 'F8',
      nota: ''
    },
    {
      fabricante: 'ASUS (laptop)',
      configuracion: 'F2, mantenida antes de pulsar encendido',
      menuArranque: 'Esc',
      nota: ''
    },
    {
      fabricante: 'Acer',
      configuracion: 'F2 (Supr en escritorio)',
      menuArranque: 'F12',
      nota: 'En muchas laptops hay que activar F12 Boot Menu en la pestaña Main de la BIOS para que funcione.'
    }
  ],

  rutaWindowsFirmware:
    'Si el inicio rápido impide pulsar la tecla a tiempo: Configuración, Sistema, Recuperación, Inicio avanzado (Reiniciar ahora), Solucionar problemas, Opciones avanzadas, Configuración de firmware UEFI.',

  limitesTemperatura: {
    columnas: ['Componente', 'Fabricante', 'Límite máximo', 'Qué ocurre en el límite'],
    filas: [
      ['Intel Core, 10.ª a 14.ª generación', 'Intel', '100 °C', 'Reduce frecuencia y voltaje. Apagado de emergencia si supera el umbral crítico.'],
      ['AMD Ryzen 7000, 8000 y 9000', 'AMD', '95 °C (89 °C en 7000X3D)', 'Diseñado para trabajar a 95 °C bajo carga multinúcleo sin degradarse.'],
      ['AMD Ryzen 3000 y 5000', 'AMD', '90 °C (105 W) o 95 °C (65 W)', 'Reduce la frecuencia al alcanzar el límite.'],
      ['NVIDIA GeForce RTX 50 (ejemplo: RTX 5060)', 'NVIDIA', '85 a 90 °C según el modelo', 'Baja la frecuencia turbo desde unos 83 °C.']
    ],
    nota:
      'Estos son límites de diseño. Un procesador moderno puede acercarse a ellos bajo carga pesada y no es una falla. Lo es si ocurre en reposo, con carga ligera o con frecuencias por debajo del reloj base.'
  },

  tensionesAtx: {
    columnas: ['Riel', 'Nominal', 'Mínimo', 'Máximo', 'Se usa en'],
    filas: [
      ['+12 V', 12, 11.4, 12.6, 'Procesador, tarjeta gráfica, ventiladores'],
      ['+5 V', 5, 4.75, 5.25, 'Unidades SATA, USB, lógica'],
      ['+3,3 V', 3.3, 3.135, 3.465, 'M.2 NVMe, chipset, PCIe'],
      ['+5VSB', 5, 4.75, 5.25, 'Espera: siempre activo con la fuente enchufada']
    ]
  }
};
