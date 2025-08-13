// interface común
export interface ProcesadorPago {
  procesarPago(monto: number): Promise<void>;
}

function assertNever(x: never): never {
  throw new Error(`Método de pagono soportado: ${JSON.stringify(x)}`);
}

// Configuraciones específicas por método de pago
export interface PayPalConfig {
  tipo: 'paypal';
  clientId: string;
  clientSecret: string;
}

export interface StripeConfig {
  tipo: 'stripe';
  apiKey: string;
  cuentaConectada?: string;
}

export interface MercadoPagoConfig {
  tipo: 'mercadopago';
  token: string;
  sandbox?: boolean;
}

export type PaymentConfig = PayPalConfig | StripeConfig | MercadoPagoConfig;

// Implementaciones concretas
export class PayPalProcesador implements ProcesadorPago {
  constructor(private config: PayPalConfig) {}
  async procesarPago(monto: number): Promise<void> {
    console.log(`[PayPal] Procesando pago de $${monto} con clientId=${this.config.clientId}`);
  }
}

export class StripeProcesador implements ProcesadorPago {
  constructor(private config: StripeConfig) {}

  async procesarPago(monto: number): Promise<void> {
    console.log(`[Stripe] Procesando pago de $${monto} con apiKey=${this.config.apiKey}`);
  }
}

export class MercadoPagoProcesador implements ProcesadorPago {
  constructor(private config: MercadoPagoConfig) {}
  async procesarPago(monto: number): Promise<void> {
    console.log(
      `[Mercado Pago] Procesando pago de $${monto} en modo sandbox=${this.config.sandbox ?? false}`
    );
  }
}

// Factory
export class ProcesadorFactory {
  static CreadorProcesador(config: PaymentConfig): ProcesadorPago {
    switch (config.tipo) {
      case 'paypal':
        return new PayPalProcesador(config);
      case 'stripe':
        return new StripeProcesador(config);
      case 'mercadopago':
        return new MercadoPagoProcesador(config);
      default:
        assertNever(config);
    }
  }
}
