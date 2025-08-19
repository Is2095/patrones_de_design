/* ------ Patrón de diseño: BUILDER ------ 

También llamado Constructor.

  Es un patrón creacional que nos permite construir objetos complejos paso a paso. Este nos permite producir distintos tipos y representaciones de un objeto empleando el mismo código de construcción.

  Nos permite construir objetos omplejos paso a paso, controlando su construcción sin necesidad de usar constructores con mil parámetros.

  Mejora la legibilidad - Permite diferentes representaciones del mismo objeto - Evita constructores gigantes o telescópicos.

  Ideal cuando: 
    Para evitar un "constructor telescópico"
    Cuando quieras que el código sea capaz de crear distintas representaciones de ciertos productos.

  Pros: Permite crear objetos complejos de forma clara, Aumenta la legibilidad y la mantenibilidad, Evita constructores largos o telescópicos, Es fácilmente extensible.

  Contras: Más clases por cada producto, Puede parecer innecesario en objetos simples, Requiere un poco más de diseño inicial, Puede generar validaciones redundantes si no se centralizan.
*/