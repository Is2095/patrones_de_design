/* ----- PATRÓN DE DISEÑO FACTORY METHOD -----

FACTORY ---> ELECCIÓN Y CREACIÓN DEL TIPO DE OBJETO (decide qué clase concreta instanciar)

Constructor virtual, es un patrón creacional que proporcion una interfaz para crear objetos en una superclase, mientras permite a las subclases alterar el tipo de objetos que se crearán.

Este patrón seusa para centralizar la creación de objetos en un solo lugar, en lugar de instanciarlos directamente con newen todo el código.

  Permite delegar la creación de objetos a subclases, encapsulando el proceso de instanciación.
  Evita el uso directo de new en el código cliente.
    * Reduce acoplamiento.
    * Facilita la extensión sin modificar el código existente.
    * Promueve el principio de abierto/cerrado.
  
  Ideal cuando: 
    * Utiliza el Factory Method cuando no conozcas de antemano las dependencias y los tipos exactos de los objetos con los que deba funcionar tu código.
    * Utiliza el Factory Method cuando quieras ahorrar recursos del sismtema mediante la reutilización de objetos existentes en lugar de reconstruirlos cada vez.

  Pros: Separa la lógica de creación del uso, Facilita agregar nuevos productos sin modificar clientes, Promueve el principio de inversión de dependencias.

  Contras: Puede agregar clases extra innecesarias en casos simples, Introduce un nivel más de abstracción, Puede parecer redundante si solo hay una implementación.
*/

// import { NotificacionFactory } from './notificador/Notificador';
// import { ConfiguracionExportador, ExportadorFactory } from './exportador/Exportador';
import { ProcesadorFactory } from './procesadorPagos/ProcedadorPagos';

// uso Notificacion
// const notificación1 = NotificacionFactory.crearNotificacion('email');
// notificación1.enviar('usuario1@gmail.com', 'Bienvenido a la plataforma!');

// const notificacion2 = NotificacionFactory.crearNotificacion('sms');
// notificacion2.enviar('usuario2@gmail.com', 'Su código es 1234');

// const notificacion3 = NotificacionFactory.crearNotificacion('push');
// notificacion3.enviar('usuario3@gmail.com', 'Tienesun nuevo mensaje');

// uso Exportador
// const configuraciones: ConfiguracionExportador[] = [
//   { tipo: 'pdf', opciones: { ruta: './reporte.pdf', comprimir: true } },
//   { tipo: 'excel', opciones: { ruta: './ventas.xlsx', hoja: '2025' } },
//   { tipo: 'json', opciones: { ruta: './data.json', indentacion: 4 } },
// ];

// for(const config of configuraciones) {
//   const exportador = ExportadorFactory.creadorExportador(config)
//   exportador.exportar({ventas: [100, 200, 300], total: 600})
// }

// uso Procesador Pagos
async function main() {
  const procesador = ProcesadorFactory.CreadorProcesador({
    tipo: 'mercadopago',
    token: 'TOKEN_123',
    sandbox: true,
  });
  await procesador.procesarPago(2500);
}

main();
