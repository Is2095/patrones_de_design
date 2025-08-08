import mongoose from 'mongoose';
import { Config, ConfigSchema } from './singletons_config/Config';

export class Database {
  // Instancia privada y estática del Singleton
  private static instance: Database;

  // configuraciones adicionales: por ejemplo las opciones de conexión, estado de conexión, etc
  private isConnected: boolean = false;
  private config: ConfigSchema;

  // Constructor privado, no vamos a poder hacer "new Database".
  private constructor(config: ConfigSchema) {
    this.config = config;
  }

  // Método público principal que permite crear o retornar la instancia de la clase. Recibiendo config (que es otro singletons)
  public static getInstance(config: ConfigSchema): Database {
    if (!Database.instance) {
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  // Médodo público para la conexión a la base de datos.
  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Ya existe una conexión activa a la base de datos.');
      return;
    }

    try {
      const config = Config.getInstance();
      const uri = config.isDev ? config.url_mongo_local : config.uri_db;

      await mongoose.connect(uri);
      this.isConnected = true;
      console.log('Conexión exitosa a Mongodb');
    } catch (error) {
      console.error('Error al conectar con MongoDB', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;

    await mongoose.disconnect();
    this.isConnected = false;
    console.log('Conexióna MongoDB cerrada.');
  }
}
