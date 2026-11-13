Manual.datos.preventivos = [
  {
    id: 'P-01',
    tipo: 'preventivo',
    titulo: 'Antes de abrir el equipo: energía y electricidad estática',
    resumen: 'Secuencia de seguridad que se repite antes de cualquier intervención interna. Protege a la persona y a los componentes.',
    riesgo: 'medio',
    duracion: '5 a 10 min',
    herramientas: [
      'Pulsera antiestática con cable (resistencia de 1 MΩ)',
      'Superficie de trabajo sin plásticos sueltos',
      'Bolsas antiestáticas metalizadas',
      'Destornilladores adecuados al equipo'
    ],
    advertencias: [
      'Los circuitos modernos pueden dañarse con descargas de 100 V o menos. Una persona solo siente la chispa por encima de 2 000 a 3 000 V.',
      'Según Dell, cerca del 20 % de las fallas por electricidad estática son inmediatas. El 80 % restante son fallas latentes que aparecen semanas o meses después.',
      'Nunca abras una fuente de poder ni un adaptador de corriente: guardan tensiones letales aunque estén desconectados.',
      'No improvises un cable de cobre entre la muñeca y tierra. La pulsera lleva una resistencia de 1 MΩ que limita la corriente si tocas una línea con tensión.'
    ],
    pasos: [
      { texto: 'Respalda tus datos si vas a intervenir el almacenamiento o el sistema.', ver: 'P-04' },
      { texto: 'Apaga el equipo por completo desde Windows. Suspender o hibernar no es suficiente.' },
      {
        texto: 'Desconecta el cable de corriente, el cargador y todos los periféricos.',
        detalle:
          'Las placas base mantienen una línea de espera de +5 V (+5VSB) aunque el equipo parezca apagado. Por eso Dell y Lenovo prohíben trabajar con el cable enchufado, incluso con la fuente apagada.'
      },
      { texto: 'Libera los pestillos y retira la batería.', solo: { bateria: ['removible'] } },
      {
        texto: 'Si el fabricante lo ofrece, desactiva la batería integrada desde la UEFI antes de abrir.',
        detalle:
          'En ThinkPad la ruta es Config, Power, Disable Built-in Battery. Al abrir el equipo, desconecta además el cable de la batería de la placa base como primer paso físico.',
        solo: { bateria: ['integrada'] }
      },
      { texto: 'Mantén pulsado el botón de encendido entre 5 y 20 segundos para descargar la energía residual.' },
      {
        texto: 'Quítate anillos, relojes y pulseras metálicas.',
        detalle: 'Pueden provocar cortocircuitos en terminales de batería. La ropa de lana o sintética no debe rozar las tarjetas.'
      },
      {
        texto: 'Colócate la pulsera antiestática y conecta su cable a una parte metálica sin pintar del chasis.',
        detalle:
          'Las pulseras inalámbricas no sirven: no ofrecen un camino real de descarga. Si no consigues pulsera, toca una parte metálica sin pintar del chasis antes de agarrar cada pieza y muévete lo menos posible. Es menos seguro, porque la carga se acumula de nuevo al moverte, pero es mejor que nada.'
      },
      {
        texto: 'Sostén tarjetas y módulos por los bordes y guarda las piezas sueltas en bolsas antiestáticas metalizadas.',
        detalle: 'Aleja del área de trabajo vasos de plástico, cinta adhesiva común y otros aislantes.'
      }
    ],
    verificacion: ['Cable y batería desconectados.', 'Pulsera conectada al metal del chasis antes de tocar cualquier tarjeta.'],
    tecnico: ['Si la batería está hinchada, no abras ni manipules el equipo: sigue C-08.'],
    fuentes: ['F001', 'F002', 'F003', 'F005', 'F006']
  },

  {
    id: 'P-02',
    tipo: 'preventivo',
    titulo: 'Limpieza interna de polvo',
    resumen: 'Quita el polvo de ventiladores, disipadores, rejillas y filtros para evitar el sobrecalentamiento.',
    riesgo: 'medio',
    duracion: '30 a 60 min',
    herramientas: [
      'Aire comprimido en lata o un soplador eléctrico, si no consigues la lata',
      'Pincel de cerdas suaves',
      'Palillo plástico para frenar las aspas',
      'Hisopos y alcohol isopropílico',
      'Paño sin pelusa',
      'Destornilladores del equipo'
    ],
    advertencias: [
      'Sujeta las aspas del ventilador mientras soplas aire. Si giran libres, el rodamiento se daña y el motor puede devolver corriente a la placa base.',
      'No uses aspiradora doméstica: genera estática y ejerce demasiada fuerza sobre las aspas.',
      'Mantén la lata vertical y sopla en ráfagas cortas. Inclinada, expulsa líquido a temperatura bajo cero.',
      'No abras la fuente de poder para limpiarla. Sopla solo por sus rejillas externas.',
      'En laptops Lenovo no presiones la tapa metálica del ventilador ni dobles los tubos de calor.'
    ],
    pasos: [
      { texto: 'Prepara el equipo con la secuencia de seguridad.', ver: 'P-01' },
      { texto: 'Deja que el equipo se enfríe entre 5 y 10 minutos después de apagarlo y desenchufarlo.' },
      { texto: 'Trabaja en un lugar ventilado, de preferencia al aire libre, para no respirar el polvo fino.' },
      {
        texto: 'Retira el panel lateral. Saca los filtros antipolvo y límpialos: deben quedar totalmente secos antes de reinstalarlos.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'Sopla el polvo del interior en ráfagas cortas, inmovilizando las aspas de cada ventilador con un palillo plástico o un dedo.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'Para un mantenimiento ligero, sopla en ráfagas cortas por las rejillas con el equipo apagado y desenchufado.',
        detalle:
          'Si el ventilador suena forzado o la temperatura ya es alta, el polvo suele formar una capa de pelusa compactada en las aletas del disipador. Soplar desde afuera lo empuja hacia el ventilador en vez de sacarlo.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Ante una obstrucción real, abre la tapa inferior siguiendo el manual del fabricante, inmoviliza el ventilador y quita la pelusa de las aletas con un pincel suave.',
        solo: { tipo: ['portatil'] }
      },
      { texto: 'Limpia las aspas muy sucias con un hisopo apenas humedecido en alcohol isopropílico.' },
      {
        texto: 'Si el ventilador se puede desmontar, retíralo completo para limpiarlo. No separes el rotor del marco.',
        detalle: 'Separar las aspas rompe el sello del rodamiento y anula la garantía del ventilador.'
      },
      { texto: 'Si separaste el disipador del procesador o de la tarjeta gráfica, renueva la pasta térmica.', ver: 'P-03' },
      { texto: 'Vuelve a armar, reconecta y enciende. Comprueba que los ventiladores giran sin roce ni ruidos.' }
    ],
    verificacion: [
      'Los ventiladores giran sin rozar.',
      'Las rejillas quedan libres de pelusa.',
      'Las temperaturas en reposo son menores que antes de limpiar.'
    ],
    tecnico: [
      'Ventilador y disipador forman una sola pieza reservada al servicio técnico (FRU) en un equipo con garantía.',
      'Persiste un ruido metálico después de limpiar.'
    ],
    fuentes: ['F008', 'F009', 'F010', 'F011', 'F012', 'F013']
  },

  {
    id: 'P-03',
    tipo: 'preventivo',
    titulo: 'Cambio de pasta térmica',
    resumen: 'Renueva el compuesto entre el procesador y el disipador cuando se separan o cuando las temperaturas son altas sin causa visible.',
    riesgo: 'alto',
    duracion: '45 a 90 min',
    herramientas: [
      'Alcohol isopropílico de 90 % o más',
      'Paños sin pelusa',
      'Pasta térmica no conductora',
      'Destornilladores del equipo',
      'Pulsera antiestática'
    ],
    advertencias: [
      'El metal líquido conduce la electricidad: una sola gota que se salga sobre un componente de la placa la destruye. Además corroe el aluminio.',
      'El alcohol isopropílico es inflamable. Trabaja desconectado y espera a que se evapore por completo antes de reconectar.',
      'En tarjetas gráficas y laptops no reemplaces las almohadillas térmicas (pads) por pasta: queda un vacío de 1 a 2 mm que quema memorias y reguladores.',
      'Tampoco cambies el grosor de un pad: uno más grueso impide que el disipador toque el chip.'
    ],
    pasos: [
      { texto: 'Prepara el equipo con la secuencia de seguridad.', ver: 'P-01' },
      {
        texto: 'Retira el disipador. Si la pasta está seca y pegada, gíralo suavemente hacia los lados antes de levantarlo.',
        detalle: 'En zócalos con pines, como AMD AM4, tirar en vertical puede arrancar el procesador y doblar los pines.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'Retira los tornillos del disipador siguiendo el orden que indica el manual del fabricante.',
        detalle: 'Dell y Lenovo numeran la secuencia junto a los tornillos. Al montar se aprieta en ese mismo orden.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Si vas a montar un disipador nuevo, revisa si trae pasta preaplicada de fábrica. Si la trae, no agregues más.',
        detalle: 'Se ve como una capa gris en la base, a veces protegida con un plástico que debes quitar.'
      },
      { texto: 'Limpia el procesador y la base del disipador con alcohol isopropílico y un paño sin pelusa.' },
      {
        texto: 'Aplica la pasta sin esparcirla; el disipador la extiende al presionar.',
        detalle:
          'Intel y AMD indican una gota del tamaño de una lenteja en el centro. Noctua recomienda 5 puntos en procesadores medianos o grandes (uno central de 3 a 4 mm y cuatro de unos 2 mm cerca de las esquinas), porque los chips internos quedan desplazados del centro. En procesadores pequeños ambos patrones coinciden.'
      },
      {
        texto: 'En chips de silicio expuesto, sin tapa metálica, cubre toda la superficie del silicio con una capa fina.',
        solo: { tipo: ['portatil'] }
      },
      { texto: 'Monta el disipador y aprieta los tornillos de forma gradual, en cruz o en el orden numerado, hasta el tope.' },
      { texto: 'Reconecta el ventilador al conector correcto de la placa base.' },
      { texto: 'Enciende el equipo y observa las temperaturas en reposo durante unos 10 minutos.', ver: 'C-03' }
    ],
    verificacion: [
      'Sin apagados ni reducción de velocidad bajo carga.',
      'Temperaturas por debajo de los límites del fabricante (ver Banco de herramientas).'
    ],
    tecnico: [
      'El equipo usa metal líquido de fábrica.',
      'El disipador o el procesador están soldados a la placa.',
      'No sabes con certeza qué tornillos retirar.'
    ],
    fuentes: ['F012', 'F013', 'F014', 'F015', 'F016', 'F017', 'F019', 'F020']
  },

  {
    id: 'P-04',
    tipo: 'preventivo',
    titulo: 'Respaldo de datos con la regla 3-2-1',
    resumen: 'Se hace antes de cualquier reparación y de forma periódica. Es el único paso que protege lo irrecuperable.',
    riesgo: 'bajo',
    duracion: '20 a 60 min',
    herramientas: ['Unidad externa', 'Cuenta en un servicio de almacenamiento en la nube', 'Herramienta de copia de Windows'],
    advertencias: [
      'Ante clics en el disco o alertas SMART, copia primero lo más importante antes de correr pruebas largas. El esfuerzo continuo puede terminar de dañar un disco que ya está fallando.'
    ],
    pasos: [
      { texto: 'Identifica lo que no puedes perder: documentos, fotos, correos, contraseñas y licencias.' },
      {
        texto: 'Aplica la regla 3-2-1: tres copias de tus datos (el original más dos), en dos tipos de medio distintos, y una de ellas guardada en otro sitio (otra casa o la nube).'
      },
      { texto: 'Copia a una unidad externa y, además, a un servicio en la nube.' },
      {
        texto: 'Desconecta la unidad externa cuando termine la copia.',
        detalle:
          'El ransomware cifra lo que encuentra conectado. Al menos una copia debe estar desconectada o ser inmutable.'
      },
      { texto: 'Abre algunos archivos desde la copia para comprobar que se pueden restaurar.' },
      {
        texto: 'No confundas sincronización con respaldo.',
        detalle:
          'Si un archivo se borra o se cifra en el equipo, la nube replica el cambio. Restaurar sistema tampoco guarda archivos personales, solo registro y controladores.'
      },
      {
        texto: 'Si usas BitLocker, guarda la clave de recuperación de 48 dígitos fuera del equipo.',
        detalle: 'La pedirán después de actualizar el firmware, restablecer la BIOS o reparar el arranque.'
      }
    ],
    verificacion: ['Hay al menos 3 copias, en 2 medios distintos, y una está en otro sitio.', 'Una restauración de prueba funcionó.'],
    tecnico: ['El disco hace clics o raspa y contiene datos sin copia: llévalo a un laboratorio de recuperación de datos.'],
    fuentes: ['F106', 'F210', 'F211', 'F308']
  },

  {
    id: 'P-05',
    tipo: 'preventivo',
    titulo: 'Revisión de la salud del almacenamiento',
    resumen: 'Lee el estado SMART de la unidad y comprueba TRIM para anticipar fallas y pérdida de velocidad.',
    riesgo: 'bajo',
    duracion: '15 a 30 min',
    herramientas: [
      'Utilidad del fabricante de la unidad (SeaTools, Samsung Magician, Kingston SSD Manager, WD Dashboard)',
      'Símbolo del sistema con permisos de administrador'
    ],
    advertencias: [
      'Un Secure Erase borra la unidad de forma irreversible y no debe interrumpirse: la unidad puede quedar bloqueada.',
      'Al clonar, el disco de destino se formatea por completo. Confirma cuál es el origen y cuál el destino.'
    ],
    pasos: [
      {
        texto: 'Escucha la unidad. Si hay clics repetidos o raspados, apaga el equipo y no ejecutes chkdsk, desfragmentadores ni clonados.',
        detalle: 'Cualquier lectura intensiva puede destruir el recubrimiento del plato. Llévalo a un servicio de recuperación de datos.',
        solo: { almacenamiento: ['hdd'] }
      },
      { texto: 'Haz un respaldo antes de pruebas largas.', ver: 'P-04' },
      {
        texto: 'Abre la utilidad del fabricante y revisa el estado global de SMART: PASS o FAIL.',
        detalle:
          'Los valores crudos de cada atributo son propios de cada fabricante. No interpretes cifras sueltas de programas de terceros; guíate por el estado frente al umbral.',
        solo: { almacenamiento: ['hdd', 'ssd_sata'] }
      },
      {
        texto: 'Abre la utilidad del fabricante y revisa: alerta crítica, bloques de reserva disponibles, porcentaje de vida usado y apagados forzados.',
        detalle:
          'El registro NVMe informa porcentaje usado, que sube de 0 % hacia 100 % o más. Samsung Magician y Kingston SSD Manager muestran vida restante, que baja de 100 % a 0 %. Un 5 % usado equivale a 95 % de salud. Llegar a 100 % no es una falla inmediata, porque el estándar permite superarlo mientras queden bloques de repuesto.',
        solo: { almacenamiento: ['nvme'] }
      },
      {
        texto: 'Comprueba que TRIM está activo. En un símbolo del sistema como administrador escribe:',
        comando: 'fsutil behavior query DisableDeleteNotify',
        detalle: 'El valor 0 significa TRIM activo; el valor 1, desactivado. La lógica parece inversa porque el comando consulta la bandera de desactivación.',
        solo: { almacenamiento: ['ssd_sata', 'nvme'] }
      },
      {
        texto: 'Considera pasar a un SSD con la herramienta de clonado del fabricante.',
        detalle:
          'Samsung ofrece Data Migration dentro de Magician; Crucial y Kingston trabajan con Acronis. En una laptop con una sola bahía, conecta el SSD nuevo por USB, clona y luego intercambia las unidades.',
        solo: { almacenamiento: ['hdd'] }
      },
      {
        texto: 'Si instalas un SSD M.2 bajo un disipador, retira antes la película plástica de la almohadilla térmica.',
        detalle: 'Dejarla actúa como aislante y provoca reducción de velocidad por temperatura.',
        solo: { almacenamiento: ['nvme'] }
      }
    ],
    verificacion: ['Estado SMART en PASS o sin alertas críticas.', 'TRIM activo en unidades de estado sólido.'],
    tecnico: ['Estado FAIL, bloques de repuesto bajo su umbral o modo de solo lectura en NVMe: respalda ya y reemplaza la unidad.'],
    fuentes: ['F101', 'F102', 'F103', 'F104', 'F105', 'F106', 'F107']
  },

  {
    id: 'P-06',
    tipo: 'preventivo',
    titulo: 'Salud de la batería de la laptop',
    resumen: 'Mide cuánta capacidad conserva la batería y corrige el medidor cuando el porcentaje no es confiable.',
    riesgo: 'medio',
    duracion: '15 a 20 min, más una carga completa',
    soloPerfil: { tipo: ['portatil'] },
    herramientas: ['Símbolo del sistema con permisos de administrador', 'Cargador original'],
    advertencias: [
      'Nunca cargues ni calibres una batería hinchada. Pasa directo a C-08.',
      'No dejes una batería en 0 % durante días: puede entrar en descarga profunda irrecuperable.'
    ],
    pasos: [
      {
        texto: 'Genera el informe de batería en un símbolo del sistema como administrador:',
        comando: 'powercfg /batteryreport',
        detalle: 'Crea un archivo HTML. El comando indica en qué carpeta lo guardó.'
      },
      {
        texto: 'Abre el informe y anota Design Capacity, Full Charge Capacity y Cycle Count.',
        detalle:
          'Divide la capacidad a carga completa entre la de diseño y multiplica por 100: ese es el porcentaje de salud. Los fabricantes sitúan la vida útil típica entre 300 y 500 ciclos antes de caer por debajo del 80 %.'
      },
      {
        texto: 'Si el porcentaje salta o el equipo se apaga antes de llegar a 0 %, calibra el medidor: carga al 100 %, usa el equipo hasta cerca del 5 % y vuelve a cargar al 100 % sin interrupciones.',
        detalle:
          'La calibración corrige el medidor, no recupera capacidad. HP añade un reposo de 3 a 5 horas apagado entre la descarga y la carga; Lenovo no lo pide. HP y Lenovo también ofrecen utilidades integradas (HP PC Hardware Diagnostics UEFI, Lenovo Vantage).'
      },
      {
        texto: 'Si la laptop pasa casi todo el día enchufada, activa el límite de carga al 80 % cuando el fabricante lo ofrezca.',
        detalle: 'En Lenovo se llama Conservation Mode o Charge Threshold.'
      },
      {
        texto: 'Revisa la forma del equipo: tapa inferior arqueada, touchpad o teclado levantados indican una batería hinchada.',
        ver: 'C-08'
      }
    ],
    verificacion: ['Porcentaje de capacidad calculado y anotado.', 'El indicador de carga es coherente con el uso real.'],
    tecnico: ['Batería integrada por debajo del 80 % en un equipo con garantía.', 'Hinchazón de cualquier grado.'],
    fuentes: ['F004', 'F201', 'F202', 'F203']
  },

  {
    id: 'P-07',
    tipo: 'preventivo',
    titulo: 'Actualización de BIOS o UEFI y del sistema',
    resumen: 'Actualiza el firmware sin dejar la placa inutilizable ni perder el acceso al disco cifrado.',
    riesgo: 'alto',
    duracion: '30 a 60 min',
    herramientas: ['Cargador conectado o UPS, por si se va la luz', 'PowerShell abierto como administrador', 'Sitio de soporte del fabricante', 'USB formateado en FAT32 si el fabricante lo pide'],
    advertencias: [
      'Un corte de energía durante la escritura puede inutilizar la placa base. No apagues, no cierres la tapa, no desenchufes.',
      'Cambiar el firmware, el TPM o Secure Boot altera las mediciones del TPM: si BitLocker está activo y no lo suspendiste, Windows pedirá la clave de 48 dígitos.'
    ],
    pasos: [
      { texto: 'Haz un respaldo y guarda la clave de BitLocker fuera del equipo.', ver: 'P-04' },
      {
        texto: 'Identifica el modelo exacto y la versión actual del firmware.',
        comando: 'msinfo32',
        detalle: 'Busca la línea Versión y fecha de BIOS.'
      },
      { texto: 'Descarga el firmware únicamente desde el sitio de soporte del fabricante del equipo o de la placa.' },
      {
        texto: 'Si BitLocker está activo, suspéndelo antes de actualizar. En PowerShell como administrador:',
        comando: 'Suspend-BitLocker -MountPoint "C:" -RebootCount 0',
        detalle: 'Con -RebootCount 0 queda suspendido aunque el equipo se reinicie varias veces. Al terminar lo reactivas con Resume-BitLocker -MountPoint "C:".'
      },
      { texto: 'Conecta el cargador y verifica que la batería tenga carga suficiente.', solo: { tipo: ['portatil'] } },
      { texto: 'Usa un UPS si tienes uno: si se va la luz a mitad de la actualización, la placa base puede quedar inservible.', solo: { tipo: ['escritorio'] } },
      { texto: 'Ejecuta el actualizador y no lo interrumpas. El equipo puede reiniciarse varias veces con la pantalla en negro.' },
      {
        texto: 'Tras actualizar, revisa en la configuración: fecha y hora, orden de arranque y modo del controlador de disco (AHCI o RAID).'
      },
      {
        texto: 'Este equipo usa BIOS clásica. Windows 11 exige UEFI nativo, Secure Boot y TPM 2.0.',
        detalle:
          'Microsoft ofrece una herramienta para convertir el disco de MBR a GPT sin perder datos. Solo después de esa conversión se desactiva el modo heredado en el firmware. Haz respaldo y consulta a un técnico antes.',
        comando: 'mbr2gpt /convert /allowFullOS',
        solo: { firmware: ['bios_legacy'] },
        nivel: 'tecnico'
      },
      { texto: 'Instala las actualizaciones de Windows y los controladores del fabricante.' }
    ],
    verificacion: ['La nueva versión aparece en msinfo32.', 'El equipo arranca sin pedir la clave de BitLocker.'],
    tecnico: ['El equipo no enciende después de actualizar: la recuperación del firmware depende del modelo (jumper, USB o combinación de teclas).'],
    fuentes: ['F114', 'F115', 'F116', 'F117', 'F118', 'F119']
  },

  {
    id: 'P-08',
    tipo: 'preventivo',
    titulo: 'Prueba de la memoria RAM',
    resumen: 'Detecta módulos defectuosos antes de que corrompan el sistema y comprueba la instalación correcta.',
    riesgo: 'bajo',
    duracion: '20 a 90 min',
    herramientas: ['Diagnóstico de memoria de Windows', 'USB con MemTest86 (prueba definitiva)'],
    advertencias: [
      'Una RAM inestable corrompe poco a poco archivos del sistema y el registro mientras están en caché. Un error aislado ya es motivo de reemplazo.',
      'Nunca insertes ni retires módulos con el equipo enchufado.',
      'No fuerces un módulo cuya muesca no coincide: cada generación tiene la muesca en una posición distinta.'
    ],
    pasos: [
      {
        texto: 'Abre el diagnóstico de Windows: pulsa Windows y R, escribe el comando y elige reiniciar ahora.',
        comando: 'mdsched.exe'
      },
      { texto: 'Elige el modo Extendido para una revisión más profunda.' },
      {
        texto: 'Al volver a Windows, abre el Visor de eventos, Registros de Windows, Sistema, y filtra por el origen MemoryDiagnostics-Results.',
        detalle: 'Los eventos 1101 y 1201 informan el resultado.'
      },
      {
        texto: 'Para una prueba definitiva, arranca MemTest86 desde un USB UEFI y completa las 4 pasadas. Cualquier error indica fallo.',
        detalle:
          'Las pruebas rápidas de Windows pueden no detectar errores que dependen de patrones, temperatura o interferencia entre filas (Row Hammer).'
      },
      {
        texto: 'Si hay errores, prueba un módulo a la vez en cada ranura para aislar el módulo o la ranura defectuosa.',
        ver: 'P-01'
      },
      {
        texto: 'Con dos módulos en una placa de cuatro ranuras, usa las ranuras A2 y B2 (segunda y cuarta desde el procesador), o las que indique el manual de la placa.',
        detalle: 'Llenar las cuatro ranuras aumenta la carga del controlador de memoria y puede bajar la frecuencia máxima.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'En escritorio, presiona con firmeza en ambos extremos del módulo hasta que los clips laterales cierren con un clic.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'En laptop, inserta el módulo en ángulo de 30° a 45° y abátelo hasta que los clips lo sujeten.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Recuerda que la DDR3 trabaja a 1,5 V (1,35 V en DDR3L) y no es compatible con DDR4 ni DDR5.',
        solo: { memoria: ['ddr3'] }
      },
      {
        texto: 'Tras instalar DDR5 nueva, el primer arranque puede tardar de 1 a 5 minutos con pantalla negra mientras el firmware entrena la memoria. No cortes la energía.',
        solo: { memoria: ['ddr5'] }
      },
      {
        texto: 'Si activaste el perfil XMP o EXPO y hay errores, vuelve a la configuración por defecto.',
        detalle: 'Intel y AMD consideran esas velocidades como overclocking del controlador de memoria.'
      }
    ],
    verificacion: ['Cero errores en MemTest86 o en el diagnóstico de Windows.', 'El módulo está asentado y los clips cerrados.'],
    tecnico: ['Los errores persisten con un módulo nuevo en una ranura distinta: probable falla de la placa o del controlador de memoria.'],
    fuentes: ['F108', 'F109', 'F110', 'F111', 'F112', 'F113']
  }
];
