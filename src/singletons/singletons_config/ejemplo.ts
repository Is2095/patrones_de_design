import { Config } from './Config';

const config = Config.getInstance();

export const conectarBaseDeDatos = () => {
  const uri = config.isDev ? config.url_mongo_local : config.uri_db;
  console.log('Conectando a: ', uri);
};
