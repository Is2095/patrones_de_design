// interfaz del producto
interface Notificador {
  enviar(destinatario: string, mensaje: string): void;
}

// implementaciones concretas
export class NotificacionEmail implements Notificador {
  enviar(destinatario: string, mensaje: string): void {
    console.log(`Enviando EMAIL a ${destinatario}: ${mensaje}`);
  }
}

export class NotificacionSMS implements Notificador {
  enviar(destinatario: string, mensaje: string): void {
    console.log(`Enviando SMS a ${destinatario}: ${mensaje}`);
  }
}

export class NotificacionPush implements Notificador {
  enviar(destinatario: string, mensaje: string): void {
    console.log(`Enviando Push a ${destinatario}: ${mensaje}`);
  }
}

// FACTORY
export class NotificacionFactory {
  static crearNotificacion(tipo: string): Notificador {
    switch (tipo.toLowerCase()) {
      case 'email':
        return new NotificacionEmail();
      case 'sms':
        return new NotificacionSMS();
      case 'push':
        return new NotificacionPush();
      default: 
        throw new Error("El tipo de notificación no soportada")
    }
  }
}
