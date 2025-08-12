interface Estrategia {
  ejecutar(): void;
}

// crear diferentes estrategias
export class EstrategiaCorreo implements Estrategia {
  ejecutar(): void {
    console.log('Enviando correo automático...');
  }
}

export class EstrategiaRecordatorio implements Estrategia {
  ejecutar(): void {
    console.log('Creando un recordatorio en el calendario...');
  }
}

export class EstrategiaPublicación implements Estrategia {
  ejecutar(): void {
    console.log('Publicando en redes sociales...');
  }
}

// Contexto: usar la estrategia, pero no sabe los detalles
export class AsistenteVirtual {
  private estrategia: Estrategia;

  constructor(estrategia: Estrategia) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia: Estrategia) {
    this.estrategia = estrategia;
  }

  ejecutarTarea() {
    this.estrategia.ejecutar();
  }
}
