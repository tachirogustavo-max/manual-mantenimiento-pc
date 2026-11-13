Manual.datos.correctivos = [
  {
    id: 'C-01',
    tipo: 'correctivo',
    titulo: 'El equipo no enciende',
    resumen: 'No hay luces, ventiladores ni sonido al pulsar el botón de encendido.',
    riesgo: 'alto',
    duracion: '20 a 60 min',
    herramientas: ['Otro cargador compatible o cable de corriente', 'Multímetro (solo nivel técnico)', 'Clip metálico (solo nivel técnico)'],
    advertencias: [
      'No abras la fuente de poder ni el cargador: guardan tensiones letales aunque estén desconectados.',
      'No mezcles cables modulares de otra fuente. Los conectores no tienen la misma distribución de pines entre marcas, y un cable equivocado puede poner 12 V donde van 5 V.'
    ],
    pasos: [
      {
        texto: 'Comprueba lo obvio: hay corriente en el tomacorriente, la regleta está encendida y el cable está firme en ambos extremos.',
        detalle: 'Si dejó de encender justo después de un apagón o de un bajón de luz, sospecha primero de la fuente de poder o del cargador. Cuando lo repares, conéctalo a un regulador de voltaje o a un UPS.'
      },
      {
        texto: 'Revisa el interruptor trasero de la fuente (posición I) y el LED de la fuente o de la placa base.',
        detalle: 'En escritorios HP, los códigos de parpadeo del LED orientan el diagnóstico. Por ejemplo, 4 parpadeos rojos se asocian a la fuente.',
        solo: { tipo: ['escritorio'] }
      },
      {
        texto: 'Prueba con el puente: con la fuente desconectada de todos los componentes, une los pines 16 (PS_ON#) y 17 (tierra) del conector de 24 pines.',
        detalle:
          'Cuenta los pines dos veces con la pestaña de traba del conector hacia arriba. Algunas fuentes tienen modo semipasivo y el ventilador no gira con poca carga; Seasonic pide desactivar su botón Hybrid antes de probar. No concluyas que está muerta solo porque el ventilador no gira.',
        solo: { tipo: ['escritorio'] },
        nivel: 'tecnico'
      },
      {
        texto: 'Mide con multímetro en voltios de corriente continua: +12 V entre 11,40 y 12,60 V; +5 V entre 4,75 y 5,25 V; +3,3 V entre 3,135 y 3,465 V.',
        solo: { tipo: ['escritorio'] },
        nivel: 'tecnico'
      },
      {
        texto: 'Enchufa el cargador a la pared y observa su LED. Luego conéctalo a la laptop.',
        detalle:
          'Si el LED se enciende en la pared pero se apaga al conectarlo al equipo, hay un cortocircuito en la placa base o en el puerto de carga y el cargador activó su protección.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Prueba con otro cargador compatible y otra toma de corriente.',
        detalle: 'Si la UEFI informa Unknown AC adapter, el equipo bloquea la carga y limita la velocidad del procesador.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Haz un reinicio forzado: desconecta el cargador (y la batería si es removible), mantén pulsado el botón de encendido de 30 a 60 segundos, reconecta e intenta encender.',
        detalle: 'Desbloquea el controlador embebido y los chips de carga USB-C. Los ThinkPad tienen además un orificio de reinicio de emergencia.',
        solo: { tipo: ['portatil'] }
      },
      {
        texto: 'Conecta el cargador unos minutos si desactivaste la batería integrada desde la UEFI.',
        solo: { bateria: ['integrada'] }
      },
      { texto: 'Si hay luces o ventiladores pero no hay imagen, continúa con el siguiente procedimiento.', ver: 'C-02' },
      { texto: 'Si sigue sin responder, la falla está en la placa base o en una pieza soldada. Ahí hace falta un técnico con equipo de soldadura.' }
    ],
    verificacion: ['El equipo enciende y llega a la pantalla de arranque.'],
    tecnico: [
      'La fuente no arranca en la prueba del puente: se reemplaza completa, no se repara.',
      'El LED del cargador se apaga al conectarlo: probable falla de placa base.',
      'El equipo está en garantía y la placa es una pieza de servicio (FRU).'
    ],
    fuentes: ['F006', 'F204', 'F205', 'F206', 'F207', 'F208', 'F209']
  },

  {
    id: 'C-02',
    tipo: 'correctivo',
    titulo: 'Enciende, pero no hay imagen',
    resumen: 'Se ven luces y se oyen los ventiladores, pero la pantalla queda negra.',
    riesgo: 'medio',
    duracion: '20 a 45 min',
    herramientas: ['Otro monitor o cable de video', 'Pulsera antiestática', 'Destornilladores del equipo'],
    advertencias: [
      'Un destornillador que cae sobre una placa con +5VSB activo provoca cortocircuito. Desconecta siempre la corriente.',
      'La pila CR2032 es peligrosa si se ingiere: mantenla fuera del alcance de niños.',
      'No hagas palanca con fuerza en el portapilas: arrancarlo del circuito exige microsoldadura.'
    ],
    pasos: [
      {
        texto: 'Comprueba el monitor: entrada correcta, cable firme y, si puedes, otro cable o puerto. En una laptop conecta un monitor externo.',
        detalle: 'Si el externo muestra imagen, la falla está en la pantalla, su cable o la bisagra: llévalo a un servicio técnico.'
      },
      {
        texto: 'Si acabas de instalar o cambiar memoria DDR5, o de activar XMP o EXPO, espera entre 1 y 5 minutos antes de forzar el apagado.',
        detalle: 'El firmware entrena la memoria en el primer arranque. Cortar la energía puede corromper la configuración guardada.',
        solo: { memoria: ['ddr5'] }
      },
      { texto: 'Apaga, desconecta y descarga la energía del equipo.', ver: 'P-01' },
      {
        texto: 'Retira y vuelve a asentar la memoria RAM hasta oír el clic de los clips.',
        detalle: 'En escritorio presiona en ambos extremos. En laptop inserta a 30° a 45° y abate el módulo.'
      },
      { texto: 'Prueba con un solo módulo en cada ranura para aislar el módulo o la ranura defectuosa.' },
      { texto: 'Vuelve a asentar la tarjeta gráfica, si la hay, y revisa sus cables de alimentación.', solo: { tipo: ['escritorio'] } },
      {
        texto: 'Si nada funcionó, restablece la CMOS. Elige un método:',
        detalle:
          'Dell, laptop: con el cargador conectado y el equipo apagado, mantén pulsado el botón de encendido 30 segundos. Placa base de escritorio: con la corriente desconectada, une los pines CLRTC durante 5 a 10 segundos (en equipos Dell, el procedimiento mueve el puente a RTCRST con el cable conectado unos 10 segundos; sigue el manual del fabricante). Pila CR2032: con todo desconectado, retírala de 5 a 10 minutos y reinstálala con el polo positivo hacia arriba.'
      },
      {
        texto: 'Después del restablecimiento, entra a la configuración y verifica fecha y hora, modo UEFI o heredado y modo del controlador (AHCI o RAID).',
        detalle: 'Si cambian, Windows puede mostrar INACCESSIBLE_BOOT_DEVICE o No Boot Device Found.',
        ver: 'C-06'
      }
    ],
    verificacion: ['Aparece la pantalla del fabricante y Windows inicia.'],
    tecnico: ['Sin imagen aun con un módulo bueno y la CMOS restablecida.', 'Imagen en monitor externo pero no en la pantalla de la laptop.'],
    fuentes: ['F108', 'F109', 'F117', 'F118', 'F119', 'F120']
  },

  {
    id: 'C-03',
    tipo: 'correctivo',
    titulo: 'Sobrecalentamiento y apagados',
    resumen: 'El equipo se calienta, los ventiladores suenan al máximo o se apaga solo.',
    riesgo: 'medio',
    duracion: '30 a 90 min',
    herramientas: ['Programa de monitoreo de temperaturas', 'Material de limpieza y pasta térmica según el caso'],
    advertencias: [
      'No uses la laptop sobre telas o superficies que bloqueen las rejillas.',
      'Si el apagado ocurre con temperaturas normales y bajo carga, sospecha de la fuente de poder y no del disipador.'
    ],
    pasos: [
      {
        texto: 'Anota cuándo ocurre: en reposo, con carga ligera o solo bajo carga pesada.',
        detalle:
          'Superar 85 °C ya no es siempre una falla. AMD diseña los Ryzen 7000 para trabajar a 95 °C bajo carga multinúcleo e Intel permite acercarse a 100 °C. Es un problema si ocurre en reposo, con carga ligera o con frecuencias por debajo del reloj base.'
      },
      { texto: 'Compara tus lecturas con los límites de cada fabricante.', detalle: 'Los encuentras en la tabla de temperaturas del Banco de herramientas.' },
      { texto: 'Comprueba que los ventiladores giran y que las rejillas están libres.' },
      { texto: 'Revisa el flujo de aire del gabinete: ventiladores de entrada y salida y filtros limpios.', solo: { tipo: ['escritorio'] } },
      { texto: 'Limpia el polvo acumulado.', ver: 'P-02' },
      { texto: 'Si las temperaturas siguen altas en reposo después de limpiar, renueva la pasta térmica.', ver: 'P-03' },
      {
        texto: 'Si el apagado ocurre de golpe bajo carga con temperaturas normales, revisa la fuente de poder.',
        detalle: 'Los apagados abruptos en juegos o renderizado pueden ser la fuente de poder protegiéndose porque no da abasto.',
        ver: 'C-01',
        solo: { tipo: ['escritorio'] }
      },
      { texto: 'Anota las temperaturas antes y después para comprobar la mejora.' }
    ],
    verificacion: ['Sin apagados bajo carga.', 'Temperaturas en reposo claramente menores que al inicio.'],
    tecnico: ['Ventilador que no gira o gira con ruido metálico tras limpiar.', 'Disipador que no se puede retirar sin riesgo de dañar tubos de calor.'],
    fuentes: ['F011', 'F013', 'F016', 'F017', 'F018', 'F206']
  },

  {
    id: 'C-04',
    tipo: 'correctivo',
    titulo: 'Lentitud extrema',
    resumen: 'El sistema tarda mucho en iniciar, abrir programas o responder.',
    riesgo: 'medio',
    duracion: '30 a 90 min',
    herramientas: ['Administrador de tareas', 'Símbolo del sistema con permisos de administrador'],
    advertencias: [
      'Si hay alertas SMART o errores como 0x7A, no ejecutes DISM ni chkdsk /r sin respaldo: las escrituras intensivas pueden terminar de degradar un disco dañado.',
      'En el arranque limpio, marca primero Ocultar todos los servicios de Microsoft. Si deshabilitas también esos servicios, puedes quedar sin acceso a tu cuenta.'
    ],
    pasos: [
      { texto: 'Respalda y revisa la salud del almacenamiento antes de cualquier reparación pesada.', ver: 'P-05' },
      {
        texto: 'Abre el Administrador de tareas con Ctrl + Shift + Esc y mira qué recurso está al 100 %: disco, memoria o procesador.'
      },
      {
        texto: 'Haz un arranque limpio: abre msconfig, pestaña Servicios, marca Ocultar todos los servicios de Microsoft y luego Deshabilitar todo. Desactiva en el Administrador de tareas las aplicaciones de inicio con impacto alto.',
        comando: 'msconfig'
      },
      {
        texto: 'Repara el sistema, en este orden, con permisos de administrador:',
        comando: ['DISM.exe /Online /Cleanup-Image /RestoreHealth', 'sfc /scannow'],
        detalle: 'DISM repara el almacén de componentes y después sfc reemplaza los archivos dañados.'
      },
      {
        texto: 'Si el disco permanece al 100 % de uso, considera pasar a un SSD.',
        detalle: 'Los HDD son muy lentos frente a un SSD.',
        ver: 'P-05',
        solo: { almacenamiento: ['hdd'] }
      },
      { texto: 'Verifica que TRIM esté activo.', ver: 'P-05', solo: { almacenamiento: ['ssd_sata', 'nvme'] } },
      { texto: 'Descarta una falla de memoria si la RAM está siempre llena o hay cierres inesperados.', ver: 'P-08' },
      { texto: 'Descarta temperatura alta: un equipo caliente reduce su velocidad.', ver: 'C-03' }
    ],
    verificacion: ['El tiempo de inicio y la respuesta mejoraron.', 'Ningún recurso permanece al 100 % sin carga de trabajo.'],
    tecnico: ['SMART en FAIL o clics en el disco.', 'DISM no logra reparar el almacén de componentes.'],
    fuentes: ['F104', 'F105', 'F106', 'F213', 'F215']
  },

  {
    id: 'C-05',
    tipo: 'correctivo',
    titulo: 'Pantallazo azul',
    resumen: 'Windows se detiene con una pantalla azul y un código de error, o se reinicia sin aviso.',
    riesgo: 'medio',
    duracion: '30 a 90 min',
    herramientas: ['Visor de eventos', 'Teléfono para fotografiar el código'],
    advertencias: ['Si el código apunta al disco, respalda antes de ejecutar reparaciones o pruebas largas.'],
    pasos: [
      {
        texto: 'Anota el código de error que aparece en la pantalla azul. Si el equipo se reinició, búscalo en el Visor de eventos.',
        detalle: 'Evento 1001 (BugCheck) y evento 41 (Kernel-Power). Los volcados quedan en C:\\Windows\\Minidump.'
      },
      { texto: 'Compara el código con esta tabla para orientar el diagnóstico.' },
      {
        texto: 'Si apareció tras instalar un controlador o actualización, arranca en modo seguro y desinstálalo.',
        detalle:
          'Desde el entorno de recuperación: Solucionar problemas, Opciones avanzadas, Configuración de inicio, y pulsa F4 (modo seguro) o F5 (con funciones de red).'
      },
      { texto: 'Si el código apunta a memoria o controladores, prueba la RAM y actualiza los controladores del fabricante.', ver: 'P-08' },
      { texto: 'Si apunta al disco, respalda de inmediato y revisa su salud.', ver: 'P-05' },
      { texto: 'Si el código es 0x7B después de cambiar la BIOS o la CMOS, restablece el modo AHCI o RAID original.', ver: 'C-06' },
      { texto: 'Si el código es 0xEF, repara los archivos del sistema.', ver: 'C-04' },
      { texto: 'Si el código es 0x124, sospecha de hardware: descarta sobrecalentamiento y llévalo a un técnico.', ver: 'C-03' }
    ],
    tabla: {
      columnas: ['Código', 'Nombre', 'Causa más probable'],
      filas: [
        ['0x50', 'PAGE_FAULT_IN_NONPAGED_AREA', 'Memoria o controladores'],
        ['0xD1', 'DRIVER_IRQL_NOT_LESS_OR_EQUAL', 'Controladores'],
        ['0x1E', 'KMODE_EXCEPTION_NOT_HANDLED', 'Memoria o controladores'],
        ['0x3B', 'SYSTEM_SERVICE_EXCEPTION', 'Memoria o controladores'],
        ['0x9F', 'DRIVER_POWER_STATE_FAILURE', 'Falla al entrar o salir de suspensión'],
        ['0x116', 'VIDEO_TDR_FAILURE', 'Tarjeta gráfica o su controlador'],
        ['0xEF', 'CRITICAL_PROCESS_DIED', 'Proceso crítico o archivos del sistema dañados'],
        ['0x7A', 'KERNEL_DATA_INPAGE_ERROR', 'Lectura del disco o archivo de paginación'],
        ['0x133', 'DPC_WATCHDOG_VIOLATION', 'Controlador o dispositivo de almacenamiento'],
        ['0x7B', 'INACCESSIBLE_BOOT_DEVICE', 'Cambio del modo del controlador de disco'],
        ['0x124', 'WHEA_UNCORRECTABLE_ERROR', 'Falla física de procesador o PCIe']
      ]
    },
    verificacion: ['El equipo funciona varios días sin repetir el error.'],
    tecnico: ['El error se repite con memoria y disco sanos.', 'Códigos 0x124 recurrentes.'],
    fuentes: ['F112', 'F113', 'F212', 'F213', 'F215']
  },

  {
    id: 'C-06',
    tipo: 'correctivo',
    titulo: 'No inicia el sistema o no detecta el disco',
    resumen: 'Aparece No boot device found, la reparación automática no termina o Windows no carga.',
    riesgo: 'alto',
    duracion: '30 a 120 min',
    herramientas: ['USB de instalación o recuperación de Windows', 'Clave de recuperación de BitLocker (48 dígitos)', 'Pulsera antiestática', 'Destornilladores del equipo'],
    advertencias: [
      'Con un HDD que hace clics, no ejecutes chkdsk /r, desfragmentadores ni clonado. El roce del cabezal destruye el plato.',
      'Con BitLocker activo, reconstruir el arranque o cambiar el modo de firmware activa la pantalla de recuperación. Ten la clave de 48 dígitos.',
      'Cambiar entre UEFI y heredado sin convertir el disco deja el equipo sin arrancar.'
    ],
    pasos: [
      { texto: 'Lee el mensaje exacto de la pantalla. Si puedes arrancar desde un USB, copia primero tus datos.', ver: 'P-04' },
      { texto: 'Entra a la configuración del firmware y comprueba si la unidad aparece en la lista.', ver: 'H-BIOS' },
      {
        texto: 'Si no aparece, apaga, desconecta todo y abre el equipo con la secuencia de seguridad. Vuelve a asentar el módulo M.2: insértalo en ángulo de 20° a 30°, alinea la muesca y bájalo hasta su separador.',
        ver: 'P-01',
        detalle: 'Si instalaste un disipador, retira la película plástica de la almohadilla térmica.',
        solo: { almacenamiento: ['nvme'] }
      },
      {
        texto: 'Si no aparece, revisa el cable de datos y el de alimentación SATA de la unidad.',
        solo: { tipo: ['escritorio'], almacenamiento: ['hdd', 'ssd_sata'] }
      },
      {
        texto: 'Si no aparece, vuelve a asentar la unidad en su bahía.',
        solo: { tipo: ['portatil'], almacenamiento: ['hdd', 'ssd_sata'] }
      },
      {
        texto: 'Si el disco hace clics repetidos o raspa, apaga el equipo de inmediato y llévalo a un servicio de recuperación de datos.',
        solo: { almacenamiento: ['hdd'] }
      },
      {
        texto: 'Si la unidad aparece, revisa el modo del firmware.',
        detalle: 'UEFI exige un disco GPT con partición EFI. El modo heredado exige un disco MBR.'
      },
      {
        texto: 'Comprueba el modo del controlador, AHCI o RAID.',
        detalle: 'Un restablecimiento de la CMOS puede cambiarlo y provoca INACCESSIBLE_BOOT_DEVICE.'
      },
      { texto: 'Arranca desde el USB de recuperación y entra a Solucionar problemas, Opciones avanzadas, Símbolo del sistema.' },
      {
        texto: 'Abre diskpart y confirma el número de disco del sistema y la letra donde está la carpeta Windows:',
        comando: ['diskpart', 'list disk', 'list volume'],
        detalle: 'En el entorno de recuperación la letra de Windows puede no ser C:. Anota la letra correcta y el número del disco.',
        solo: { firmware: ['uefi'] },
        nivel: 'tecnico'
      },
      {
        texto: 'Asigna una letra a la partición EFI (FAT32) del disco del sistema:',
        comando: ['select disk D', 'list volume', 'select volume N', 'assign letter=S', 'exit'],
        detalle: 'Sustituye D por el número del disco del sistema y N por el volumen EFI de formato FAT32.',
        solo: { firmware: ['uefi'] },
        nivel: 'tecnico'
      },
      {
        texto: 'Regenera los archivos de arranque indicando la letra real donde está Windows:',
        comando: 'bcdboot W:\\Windows /s S: /f UEFI',
        detalle: 'Sustituye W: por la letra de la partición con Windows que viste en list volume. En UEFI moderno, bootrec /fixboot suele responder Acceso denegado; Microsoft indica bcdboot como el procedimiento fiable.',
        solo: { firmware: ['uefi'] },
        nivel: 'tecnico'
      },
      {
        texto: 'Repara el arranque en modo heredado:',
        comando: ['bootrec /fixmbr', 'bootrec /fixboot', 'bootrec /scanos', 'bootrec /rebuildbcd'],
        solo: { firmware: ['bios_legacy'] },
        nivel: 'tecnico'
      },
      { texto: 'Si Windows arranca, repara los archivos del sistema y revisa el disco.', ver: 'C-04' }
    ],
    verificacion: ['Windows inicia sin mensajes de error.', 'La unidad aparece en la configuración del firmware.'],
    tecnico: [
      'Clics, raspado o disco que desaparece al calentarse.',
      'El SSD no aparece en el firmware tras reasentarlo.',
      'No tienes la clave de BitLocker.'
    ],
    fuentes: ['F105', 'F106', 'F107', 'F115', 'F117', 'F214', 'F215']
  },

  {
    id: 'C-07',
    tipo: 'correctivo',
    titulo: 'Sin internet o sin Wi-Fi',
    resumen: 'El equipo no se conecta, dice Conectado sin Internet o la conexión se corta.',
    riesgo: 'bajo',
    duracion: '20 a 60 min',
    herramientas: ['Símbolo del sistema con permisos de administrador', 'Instalador del controlador de red descargado de antemano'],
    advertencias: [
      'Descarga el instalador del controlador antes de desinstalar el actual. Si no, quedarás sin conexión para bajarlo.',
      'El restablecimiento de red elimina adaptadores virtuales, VPN, IP fijas y redes Wi-Fi guardadas.',
      'Nunca dejes cables de antena sueltos dentro del chasis: pueden provocar cortocircuitos.'
    ],
    pasos: [
      { texto: 'Descarta lo básico: modo avión, interruptor físico de Wi-Fi, otro dispositivo en la misma red y reinicio del router.' },
      {
        texto: 'Aísla el problema por capas en un símbolo del sistema:',
        comando: ['ipconfig /all', 'ping 127.0.0.1', 'ping 8.8.8.8', 'nslookup microsoft.com'],
        detalle:
          'Si falla el primer ping, el problema es la pila TCP/IP. Si responde la IP externa pero falla nslookup, es el DNS. Una dirección 169.254.x.x indica que no hay respuesta del servidor DHCP.'
      },
      {
        texto: 'Restablece la pila de red, en este orden, con permisos de administrador y reinicia al terminar:',
        comando: ['netsh winsock reset', 'netsh int ip reset', 'ipconfig /release', 'ipconfig /renew', 'ipconfig /flushdns']
      },
      {
        texto: 'Genera el informe de Wi-Fi para ver el historial de conexiones y desconexiones:',
        comando: 'netsh wlan show wlanreport'
      },
      {
        texto: 'Reinstala el controlador de forma limpia: en el Administrador de dispositivos, desinstala el adaptador marcando Intentar quitar el controlador de este dispositivo, reinicia e instala el paquete descargado.',
        detalle: 'Prioriza el paquete del fabricante del equipo (Dell, HP, Lenovo): incluye perfiles regulatorios y de antenas específicos del chasis.',
        comando: 'devmgmt.msc'
      },
      {
        texto: 'En las propiedades avanzadas del adaptador, prueba Banda preferida en 5 GHz si siempre se conecta en 2,4 GHz.',
        detalle: 'Si se corta con un router antiguo, baja temporalmente el modo inalámbrico a 802.11ac o 802.11n para confirmar si hay incompatibilidad.',
        nivel: 'tecnico'
      },
      {
        texto: 'En el router: en 2,4 GHz usa canales 1, 6 u 11 con ancho de 20 MHz. Si 5 GHz se desconecta, prueba canales 36 a 48 o 149 a 165 para evitar DFS.',
        nivel: 'tecnico'
      },
      {
        texto: 'Como último recurso usa Restablecimiento de red, en Configuración, Red e Internet. Antes guarda tu configuración:',
        comando: 'ipconfig /all > respaldo_red.txt'
      },
      {
        texto: 'Si falla la tarjeta Wi-Fi M.2, vuelve a asentarla con el equipo desconectado y la batería desactivada. Conecta y desconecta los cables de antena en perpendicular.',
        ver: 'P-01',
        solo: { tipo: ['portatil'] },
        nivel: 'tecnico'
      }
    ],
    verificacion: ['Cargan páginas web y el internet no se cae.', 'El informe de Wi-Fi no muestra desconexiones recientes.'],
    tecnico: ['La tarjeta Wi-Fi no aparece en el Administrador de dispositivos aun después de reasentarla.'],
    fuentes: ['F301', 'F302', 'F303', 'F304', 'F305', 'F306', 'F307']
  },

  {
    id: 'C-08',
    tipo: 'correctivo',
    titulo: 'Batería hinchada o que no carga',
    resumen: 'La carcasa se arquea, el touchpad se levanta, hay calor u olor químico, o la batería no carga.',
    riesgo: 'critico',
    duracion: '10 a 30 min',
    soloPerfil: { tipo: ['portatil'] },
    herramientas: ['Superficie no combustible', 'Guantes', 'Punto autorizado de reciclaje electrónico'],
    advertencias: [
      'Una batería hinchada no es un defecto estético: es un riesgo de incendio por gases inflamables y tóxicos.',
      'No la cargues, no la calientes y no la presiones.',
      'Nunca la pinches ni hagas palanca con herramientas metálicas. Perforar la envoltura provoca un cortocircuito y fuego difícil de apagar.'
    ],
    pasos: [
      {
        texto: 'Si hay humo, calor intenso, siseo u olor químico: no toques ni abras el equipo. Aíslalo sobre una superficie no combustible, ventila y aléjate.'
      },
      { texto: 'Si la carcasa está arqueada o el touchpad o el teclado están levantados: apaga el equipo, desconecta el cargador y no vuelvas a cargarlo.' },
      {
        texto: 'Deja que la batería se descargue antes de manipularla, sin presionar el chasis.',
        detalle: 'Dell indica esperar a que el equipo ya no encienda e iFixit sugiere llegar por debajo del 25 %. Con menos carga hay menos energía disponible si se perfora la celda por accidente.'
      },
      {
        texto: 'Deja que un técnico la saque.',
        detalle:
          'HP recomienda que las baterías internas hinchadas las retire solo un técnico autorizado. Si es removible, está fría y estable, retírala con cuidado y sin herramientas metálicas.'
      },
      { texto: 'Guárdala sobre una superficie no combustible, lejos de materiales inflamables.' },
      {
        texto: 'No la tires a la basura común ni la envíes por correo. Llévala a un punto autorizado de reciclaje electrónico.'
      },
      {
        texto: 'Si no está hinchada pero no carga, descarta primero el cargador.',
        ver: 'C-01'
      },
      { texto: 'Después revisa la capacidad real y calibra el medidor.', ver: 'P-06' }
    ],
    verificacion: ['La batería dañada está aislada y fuera de uso.', 'El equipo no se usa con esa batería mientras no se reemplace.'],
    tecnico: ['Cualquier grado de hinchazón en batería integrada.', 'Calor, humo, olor o líquido: llama a emergencias si hay fuego.'],
    fuentes: ['F004', 'F007', 'F202']
  }
];
