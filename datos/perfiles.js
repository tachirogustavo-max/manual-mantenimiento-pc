Manual.datos.perfiles = {
  campos: [
    {
      clave: 'tipo',
      titulo: 'Tipo de equipo',
      ayuda: 'Cambia el desarme, la desconexión de energía y las piezas disponibles.',
      opciones: [
        { valor: 'portatil', etiqueta: 'Laptop' },
        { valor: 'escritorio', etiqueta: 'Escritorio' }
      ]
    },
    {
      clave: 'almacenamiento',
      titulo: 'Almacenamiento',
      ayuda:
        'En el Administrador de tareas, pestaña Rendimiento, abre Disco. Si dice HDD, es un disco duro. Si dice SSD y el modelo menciona NVMe o PCIe, es NVMe; si no, es SSD SATA.',
      opciones: [
        { valor: 'hdd', etiqueta: 'Disco duro (HDD)' },
        { valor: 'ssd_sata', etiqueta: 'SSD SATA' },
        { valor: 'nvme', etiqueta: 'SSD NVMe (M.2)' }
      ]
    },
    {
      clave: 'memoria',
      titulo: 'Memoria RAM',
      ayuda: 'En el Administrador de tareas, pestaña Rendimiento, abre Memoria: indica DDR3, DDR4 o DDR5.',
      opciones: [
        { valor: 'ddr3', etiqueta: 'DDR3' },
        { valor: 'ddr4', etiqueta: 'DDR4' },
        { valor: 'ddr5', etiqueta: 'DDR5' }
      ]
    },
    {
      clave: 'firmware',
      titulo: 'Firmware',
      ayuda: 'Ejecuta msinfo32 y busca la línea Modo de BIOS: dice UEFI o Heredado.',
      opciones: [
        { valor: 'bios_legacy', etiqueta: 'BIOS clásica (Legacy)' },
        { valor: 'uefi', etiqueta: 'UEFI' }
      ]
    },
    {
      clave: 'bateria',
      titulo: 'Batería',
      ayuda: 'Si se retira con pestillos desde fuera sin abrir el equipo, es removible.',
      soloSi: { tipo: ['portatil'] },
      opciones: [
        { valor: 'removible', etiqueta: 'Removible' },
        { valor: 'integrada', etiqueta: 'Integrada' }
      ]
    }
  ],

  presets: [
    {
      id: 'portatil_moderno',
      nombre: 'Laptop moderna',
      descripcion: 'SSD NVMe, DDR4, UEFI y batería integrada.',
      valores: { tipo: 'portatil', almacenamiento: 'nvme', memoria: 'ddr4', firmware: 'uefi', bateria: 'integrada' }
    },
    {
      id: 'portatil_antiguo',
      nombre: 'Laptop antigua',
      descripcion: 'Disco duro, DDR3, BIOS clásica y batería removible.',
      valores: { tipo: 'portatil', almacenamiento: 'hdd', memoria: 'ddr3', firmware: 'bios_legacy', bateria: 'removible' }
    },
    {
      id: 'escritorio_moderno',
      nombre: 'Escritorio moderno',
      descripcion: 'SSD NVMe, DDR5 y UEFI.',
      valores: { tipo: 'escritorio', almacenamiento: 'nvme', memoria: 'ddr5', firmware: 'uefi', bateria: 'no_aplica' }
    },
    {
      id: 'escritorio_antiguo',
      nombre: 'Escritorio antiguo',
      descripcion: 'Disco duro, DDR3 y BIOS clásica.',
      valores: { tipo: 'escritorio', almacenamiento: 'hdd', memoria: 'ddr3', firmware: 'bios_legacy', bateria: 'no_aplica' }
    }
  ]
};
