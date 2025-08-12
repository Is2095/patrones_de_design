// interfaz común para las estrategias
interface MetodoPago {
  pagar(monto: number, datos: unknown): void;
}

// estrategias concretas
export class PagoTarjetaCredito implements MetodoPago {
  pagar(monto: number, datos: { numero: string; cvv: string; vencimiento: string }): void {
    if (!datos.numero || datos.numero.length !== 16) {
      console.log('Error: número de tarjeta inválido');
      return;
    }
    console.log(
      `Procesando pago de $${monto} con la tarjeto de crédito terminada en ...${datos.numero.slice(-4)}`
    );
  }
}

export class PagoPayPal implements MetodoPago {
  pagar(monto: number, datos: { email: string; password: string }): void {
    if (!datos.email.includes('@')) {
      console.log('Error: email inválido');
      return;
    }
    console.log(`Procesando pago de $${monto} usando PayPal de ${datos.email}...`);
  }
}

export class PagoCriptomonedas implements MetodoPago {
  pagar(monto: number, datos: { wallet: string; network: string }): void {
    if (!datos.wallet.startsWith('0x')) {
      console.log('Error: dirección de wallet inválida');
      return;
    }
    console.log(`Procesando pago de $${monto} con criptomonedas en la red ${datos.network}...`);    
  }
}

// Contexto que usa la estrategia
export class ProcesadorPagos {
  private metodoPago: MetodoPago;

  constructor(metodoPago: MetodoPago) {
    this.metodoPago = metodoPago
  }

  setMetodoPago(metodoPago:MetodoPago){
    this.metodoPago= metodoPago
  }

  procesar(monto: number, datos: unknown) {
    this.metodoPago.pagar(monto, datos)
  }
}