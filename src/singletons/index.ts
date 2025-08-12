import { Database } from './ConeccionDataBase';
import { Logger } from './logger';
import { Config } from './singletons_config/Config';
import { conectarBaseDeDatos } from './singletons_config/ejemplo';

/* 
------   SINGLETONS  ------

Este patrón evita que se creen múltiples instancias de una clase, Asegurando que exista una única instancia global accesible desde cualquier parte del sistema.
Ideal cuando:
  Se necesita controlar el acceso a recursos compartidos (ej: conexiones a base de datos, logging, configuraciones de app, etc.)
  Debe existir un único punto de coordinación
*/

(async () => {
  const config = Config.getInstance();
  // inyección de dependencia para respetar el principio D de SOLID (Inversión de Dependencias) "el módulo de alto nivel no debería depender de módulos de bajo nivel directamente sino de abstracciones(interfaces)"
  const db = Database.getInstance(config);

  try {
    await db.connect();

    console.log('\n ---- Singletons Config ---- Database ');
    console.log(`Servidor corriendo en puerto ${config.port}`);
  } catch (error) {
    console.error('no se pudo iniciar la app: ', error);
  }

  console.log('\n ---- Singletons Config ---- Config');

  console.log(`Servidor escuchando en el puerto ${config.port}`);
  conectarBaseDeDatos();
})();

console.log('\n ---- Singletons Logger ---- ');

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log('Este es el logger número 1');
logger2.log('Este es el logger número 2');

console.log('Es la misma instancia? ', logger1 === logger2);

console.log('\n ---- Singletons GlobalCounter ---- ');

import './globalCounter/moduloA'
import './globalCounter/moduloB'
import './globalCounter/moduloC'

console.log('\n ---- Singletons Notificaciones ---- ');

import './notificationCenter/moduloA'
import './notificationCenter/moduloB'
