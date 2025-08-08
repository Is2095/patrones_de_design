import dotenv from 'dotenv'

dotenv.config()

export interface ConfigSchema {
  port: number;
  uri_db: string;
  url_mongo_local: string;
  isDev: boolean;
  urlNoticiasXML: string[];
}

export class Config implements ConfigSchema {
  private static instance: Config;

  public readonly port: number;
  public readonly uri_db: string;
  public readonly url_mongo_local: string;
  public readonly isDev: boolean;
  public readonly urlNoticiasXML: string[];

  private constructor() {
    const {
      PORT,
      DB_USER,
      DB_PASSWORD,
      DB_CLUSTER,
      DB_NAME,
      URL_MONGO_LOCAL,
      IS_DEV,
      URL_API_DE_NOTICIAS_XML
    } = process.env;

    // validación
    if(!PORT || !DB_USER || !DB_PASSWORD || !DB_CLUSTER || !DB_NAME || !URL_MONGO_LOCAL) {
      throw new Error("Faltan variables de entorno requeridas")
    }

    this.port = parseInt(PORT, 10)
    this.uri_db = `mongodeb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.7rytdze.mongodb.net/${DB_NAME}?retryWrites=true&appName=${DB_CLUSTER}`
    this.url_mongo_local = URL_MONGO_LOCAL;
    this.isDev = IS_DEV === "true";

    if(!URL_API_DE_NOTICIAS_XML){
      this.urlNoticiasXML = []
    } else {
      this.urlNoticiasXML = URL_API_DE_NOTICIAS_XML.split(",").map((url) => url.trim())
    }
  }

  public static getInstance(): Config {
    if(!Config.instance) {
      Config.instance =new Config();
    }
    return Config.instance;
  }
}