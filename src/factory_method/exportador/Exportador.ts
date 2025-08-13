// interfaz común para todos los exportadores
export interface Exportador {
  exportar(datos: unknown): void;
}

function assertNever(x: never): never{
  throw new Error(`Tipo de exportador no soportado: ${JSON.stringify(x)}`)
}

// Implementación concretas
export class ExportadorPDF implements Exportador {
  constructor(
    private ruta: string,
    private comprimir: boolean
  ) {}
  exportar(datos: unknown): void {
    console.log(`Exportar PDF en ${this.ruta} (comprimir = ${this.comprimir} con datos: )`, datos);
  }
}

export class ExportadorExcel implements Exportador {
  constructor(
    private ruta: string,
    private hoja: string
  ) {}

  exportar(datos: unknown): void {
    console.log(`Exportando Excel en ${this.ruta} (hoja = "${this.hoja}") con datos:`, datos);
  }
}

export class ExportadorJSON implements Exportador {
  constructor(
    private ruta: string,
    private indentacion: number
  ) {}
  exportar(datos: unknown): void {
    console.log(
      `Exportando JSON en ${this.ruta} (indentación = ${this.indentacion}) con datos: `,
      datos
    );
  }
}

//configuración de tipos y parámetros
export type ConfiguracionExportador =
  | { tipo: 'pdf'; opciones: { ruta: string; comprimir?: boolean } }
  | { tipo: 'excel'; opciones: { ruta: string; hoja?: string } }
  | { tipo: 'json'; opciones: { ruta: string; indentacion?: number } };

// Factory
export class ExportadorFactory {
  static creadorExportador(config: ConfiguracionExportador): Exportador {
    switch (config.tipo) {
      case 'pdf':
        return new ExportadorPDF(config.opciones.ruta, config.opciones.comprimir ?? false);
      case 'excel':
        return new ExportadorExcel(config.opciones.ruta, config.opciones.hoja ?? 'Hoja1');
      case 'json':
        return new ExportadorJSON(config.opciones.ruta, config.opciones.indentacion ?? 2);
      default:
        return assertNever(config as never)
    }
  }
}
