Manual.datos.diagnostico = {
  preguntas: [
    {
      id: 'sintoma',
      tipo: 'una',
      titulo: '¿Qué hace el equipo?',
      opciones: [
        { valor: 'no_enciende', texto: 'No enciende', ayuda: 'Sin luces, ventiladores ni sonido.', puntos: { 'C-01': 6 } },
        {
          valor: 'sin_imagen',
          texto: 'Enciende, pero la pantalla queda negra',
          ayuda: 'Hay luces o ventiladores, pero no hay imagen.',
          puntos: { 'C-02': 6, 'C-01': 1 }
        },
        {
          valor: 'calor',
          texto: 'Se calienta mucho o se apaga solo',
          puntos: { 'C-03': 6, 'P-02': 2, 'P-03': 2, 'C-01': 1 }
        },
        { valor: 'lento', texto: 'Está muy lento', puntos: { 'C-04': 6, 'P-05': 3, 'P-08': 1 } },
        {
          valor: 'azul',
          texto: 'Muestra una pantalla azul o se reinicia solo',
          puntos: { 'C-05': 6, 'P-08': 2, 'P-05': 1 }
        },
        {
          valor: 'sin_inicio',
          texto: 'Windows no carga o dice que no encuentra el disco',
          puntos: { 'C-06': 6, 'P-05': 2, 'P-04': 2 }
        },
        { valor: 'sin_red', texto: 'No se conecta a internet o al Wi-Fi', puntos: { 'C-07': 6 } },
        {
          valor: 'bateria',
          texto: 'La batería no carga, dura poco o se ve hinchada',
          solo: { tipo: ['portatil'] },
          puntos: { 'C-08': 6, 'P-06': 3, 'C-01': 1 }
        },
        {
          valor: 'prevenir',
          texto: 'No falla, solo quiero hacerle mantenimiento',
          puntos: { 'P-01': 3, 'P-04': 5, 'P-02': 4, 'P-05': 3, 'P-06': 3, 'P-07': 2, 'P-08': 2, 'P-03': 1 }
        }
      ]
    },
    {
      id: 'senales',
      tipo: 'varias',
      omitirSi: { sintoma: ['prevenir'] },
      titulo: '¿Notas alguna de estas señales?',
      ayuda: 'Puedes marcar varias.',
      opciones: [
        {
          valor: 'olor',
          texto: 'Olor a quemado, humo o calor excesivo en la carcasa',
          alerta: 'olor',
          puntos: { 'C-08': 3, 'C-01': 2 }
        },
        {
          valor: 'hinchada',
          texto: 'La base se arquea o el teclado o touchpad se levantan',
          alerta: 'hinchada',
          solo: { tipo: ['portatil'] },
          puntos: { 'C-08': 9 }
        },
        {
          valor: 'clics',
          texto: 'El disco hace clics repetidos o raspa',
          alerta: 'clics',
          solo: { almacenamiento: ['hdd'] },
          puntos: { 'C-06': 3, 'P-04': 5 }
        },
        { valor: 'ninguna', texto: 'No noto ninguna', exclusiva: true, puntos: {} }
      ]
    },
    {
      id: 'inicio',
      tipo: 'una',
      omitirSi: { sintoma: ['prevenir'] },
      titulo: '¿Cuándo empezó?',
      opciones: [
        {
          valor: 'tras_cambio',
          texto: 'Después de instalar un programa, controlador o actualización',
          puntos: { 'C-04': 2, 'C-05': 2, 'C-07': 1 }
        },
        {
          valor: 'tras_abrir',
          texto: 'Después de abrir el equipo o cambiar una pieza',
          puntos: { 'C-02': 3, 'C-06': 2, 'C-01': 1 }
        },
        {
          valor: 'poco_a_poco',
          texto: 'Poco a poco, durante semanas o meses',
          puntos: { 'P-02': 2, 'P-03': 2, 'P-05': 2, 'P-06': 1, 'C-03': 1 }
        },
        {
          valor: 'de_repente',
          texto: 'De un momento a otro',
          puntos: { 'C-01': 1, 'C-02': 1, 'C-06': 1, 'C-05': 1 }
        }
      ]
    }
  ],

  alertas: {
    olor: {
      titulo: 'Olor a quemado o humo',
      texto:
        'Apaga el equipo y desconéctalo si puedes hacerlo sin tocar zonas calientes. No lo abras. Ponlo sobre una superficie que no arda, ventila el lugar y aléjate si sale humo o escuchas un siseo.',
      procedimiento: { portatil: 'C-08', escritorio: 'C-01' }
    },
    hinchada: {
      titulo: 'Posible batería hinchada',
      texto:
        'Apaga el equipo, desconecta el cargador y no vuelvas a cargarlo. No presiones la base ni la batería, y no uses herramientas metálicas.',
      procedimiento: 'C-08'
    },
    clics: {
      titulo: 'Posible daño mecánico en el disco',
      texto:
        'Apaga el equipo. No ejecutes chkdsk, desfragmentadores ni clonados. Si hay datos sin respaldo, consulta un servicio de recuperación.',
      procedimiento: 'C-06'
    }
  }
};
