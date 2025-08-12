import {
  AsistenteVirtual,
  EstrategiaCorreo,
  EstrategiaPublicación,
  EstrategiaRecordatorio,
} from './asistenteVirtual/AsistenteVirtual';
import {
  CentralDeEnvios,
  EnvioAereo,
  EnvioMaritimo,
  EnvioTerrestres,
} from './calcularEnvio/envio_paquetes';
import { PagoCriptomonedas, PagoPayPal, PagoTarjetaCredito, ProcesadorPagos } from './sistemaDePago/Sistema_de_pago';

import { MotorRecomendaciones, Producto, RecomendacionPorHistorial, RecomendacionPorPorPopularidad, RecomendacionPorUbicacion, Usuario } from './estrategiRecomendacion/EstrategiRecomendacion';

/* ------ Patrón de diseño: STRATEGY ------

  Es un patrón de diseño de comportamiento que te permite definir una familia de algoritmos, colocar cada uno de ellos en una clase separada y hacer sus objetos intercambiables.

  Permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables sin modificar el código del cliente que los usa.
    - Evita if/switch gigantes
    - Permite cambiar comportamientos en tiempo de ejecución
    - Promueve el principio de abierto/cerrado
    - Se puede agregar una nueva estrategia sin tocar las existentes.

  Ideal cuando:
    * Utiliza el patrón Strategy cuando quieras utilizar distintas variantes de un algoritmo dentro de un objeto y poder cambiar de un algoritmo a otro durante el tiempo de ejecución.
    * Cuando  tengas muchas clases similares que sólo se diferencien en la forma en que ejecutan cierto comportamiento.
    * Cuando tu clase tenga un enorme operador condicional que cambie entre distintas variantes del mismo algoritmo.

  Pros: Código limpio, sin if/switch, Cambia comportamiento sin modificar clases existentes, Fomenta el principio de composición.
  Contras: Puede agregarse muchas clases pequeñas, Puede ser overkill para casos simples, requiere diseñar con antelación.
*/

/* CENTRAL DE ENVIOS */
const centralDeEnvios = new CentralDeEnvios();

centralDeEnvios.cambiarEstrategia(new EnvioTerrestres());
console.log('El envío por tierra tiene un costo de: ', centralDeEnvios.calcularEnvio(10));

centralDeEnvios.cambiarEstrategia(new EnvioAereo());
console.log('El envio por Aire tiene un costo de: ', centralDeEnvios.calcularEnvio(10));

centralDeEnvios.cambiarEstrategia(new EnvioMaritimo());
console.log('El envío por Mar tiene un costo de: ', centralDeEnvios.calcularEnvio(10));

/* ASISTENTE VIRTUAL */

const asistente = new AsistenteVirtual(new EstrategiaCorreo());
asistente.ejecutarTarea();

asistente.setEstrategia(new EstrategiaRecordatorio());
asistente.ejecutarTarea();

asistente.setEstrategia(new EstrategiaPublicación());
asistente.ejecutarTarea();

/* METODO DE PAGO */

const procesador = new ProcesadorPagos(new PagoTarjetaCredito());
procesador.procesar(100, {
  numero: '1234567812345678',
  cvv: '123',
  vencimiento: '12/25',
});

procesador.setMetodoPago(new PagoPayPal())
procesador.procesar(75, {
  email: "usuario@correo.com",
  password: "12345"
})

procesador.setMetodoPago(new PagoCriptomonedas())
procesador.procesar(250, {
  wallet: "0xABCD1234EF567890",
  network: "Ethereum"
})

/* CATÁLOGO DE RECOMENDACIONES */


// --- Simulación de datos ---
const catalogo = [
    new Producto(1, "Laptop", "Electrónica", 500, ["Argentina", "Chile"]),
    new Producto(2, "Smartphone", "Electrónica", 1200, ["Argentina"]),
    new Producto(3, "Bicicleta", "Deportes", 800, ["Chile"]),
    new Producto(4, "Cafetera", "Hogar", 300, ["Argentina", "Chile", "Perú"]),
    new Producto(5, "Zapatillas", "Moda", 1500, ["Argentina"])
];

const usuario = new Usuario(1, "Ismael", [2, 4], "Argentina")

// uso del patrón 
const motor = new MotorRecomendaciones(new RecomendacionPorHistorial())
console.log(motor.obtenerRecomendaciones(usuario, catalogo));

motor.setEstrategia(new RecomendacionPorPorPopularidad())
console.log(motor.obtenerRecomendaciones(usuario, catalogo));

motor.setEstrategia(new RecomendacionPorUbicacion())
console.log(motor.obtenerRecomendaciones(usuario, catalogo));



