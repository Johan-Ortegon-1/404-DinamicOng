import { Ubicacion } from './ubicacion';
import { Usuario } from './usuario';

// Clase que representa el modelo de la ONG
// Extiende de la clase Usuario
export class Ong extends Usuario {

  public vision: string; // Visión de la ONG
  public mision: string; // Misión de la ONG
  public iniciativas: Array<string>; // Lista de id's de las iniciativas que ha creado la ONG

  // Metodo constructor para crear un objeto de clase ONG
  // Se inicializan listas y valores necesarios
  constructor() {
    super();
    this.rol = 'Ong';
    this.iniciativas = [];
  }

}
