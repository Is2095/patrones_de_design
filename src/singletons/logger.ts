// el Patrón de diseño Singleton, es creacional, asegura que una clase tenga una única instancia y porporciona un punto de acceso global a ella

export class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if(!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance
  }

  public log(message: string): void {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] ${message}`);
    
  }
}