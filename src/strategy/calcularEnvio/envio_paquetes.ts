// interfaz que representa una estrategia
interface CalculoCostoDeEnvio {
  calcular(peso: number): number;
}

// Estrategia concretas
export class EnvioTerrestres implements CalculoCostoDeEnvio {
  calcular(peso: number): number {
    return peso * 1.5;
  }
}

export class EnvioAereo implements CalculoCostoDeEnvio {
  calcular(peso: number): number {
    return peso * 3.0;
  }
}

export class EnvioMaritimo implements CalculoCostoDeEnvio {
  calcular(peso: number): number {
    return peso * 0.9;
  }
}

// contexto que usa la estrategia
export class CentralDeEnvios {
  constructor(private strategy?: CalculoCostoDeEnvio) {}

  cambiarEstrategia(strategy: CalculoCostoDeEnvio): void {
    this.strategy = strategy
  }

  calcularEnvio(peso: number): number | undefined {
    return this.strategy?.calcular(peso)
  }
}
