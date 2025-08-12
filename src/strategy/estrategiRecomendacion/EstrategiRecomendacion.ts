interface EstrategiRecomendacion {
  recomendar(usuario: Usuario, catalogo: Producto[]): Producto[]
}

export class Usuario {
  constructor (
    public id: number,
    public nombre: string,
    public historialCompras: number[], // id de los productos
    public ubicacion: string
  ) {}
}

export class Producto {
 constructor(
  public id: number,
  public nombre: string,
  public categoria: string,
  public ventas: number,
  public ubicacionesDisponibles: string[]
 ) {}
}

// Estrategias concretas 
export class RecomendacionPorHistorial implements EstrategiRecomendacion {
  recomendar(usuario: Usuario, catalogo: Producto[]): Producto[] {
      console.log(`Analizando historial de compras de ${usuario.nombre}...`);
      return catalogo.filter(p => usuario.historialCompras.includes(p.id))     
  }
}

export class RecomendacionPorPorPopularidad implements EstrategiRecomendacion {
  recomendar(usuario: Usuario, catalogo: Producto[]): Producto[] {
      console.log("Mostrando los productos más populares...");
      return [...catalogo].sort((a, b) => b.ventas - a.ventas).slice(0, 3)      
  }
}

export class RecomendacionPorUbicacion implements EstrategiRecomendacion {
  recomendar(usuario: Usuario, catalogo: Producto[]): Producto[] {
      console.log(`Buscandoproductos disponibles en ${usuario.ubicacion}...`);
      return catalogo.filter(p => p.ubicacionesDisponibles.includes(usuario.ubicacion))      
  }
}

// Contexto 
export class MotorRecomendaciones {
  constructor(private estrategia: EstrategiRecomendacion){}

  setEstrategia(estrategia: EstrategiRecomendacion){
    this.estrategia = estrategia
  }
  obtenerRecomendaciones(usuario: Usuario, catalogo: Producto[]): Producto[] {
    return this.estrategia.recomendar(usuario, catalogo)
  }
}