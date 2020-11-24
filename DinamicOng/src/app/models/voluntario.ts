import {​​ Usuario }​​ from './usuario';
import {​​ Conocimiento }​​ from './conocimiento';

// Clase que representa el modelo del Voluntario
// Extiende de la clase Usuario
export class Voluntario extends Usuario {​​

  public habilidades: Conocimiento[]; // Lista de habilidades que posee el voluntario, representa las areas de conocimiento que este maneja
  public idiomas: string[]; // Lista de idiomas que domina el voluntario
  public fechaNacimiento: Date; // Fecha de nacimiento del voluntario
  public participaciones: Array<string>; // Lista con los id's de las iniciativas en las que ha participado el voluntario

  // Metodo constructor para crear un objeto de clase Voluntario
  // Se inicializan listas y valores necesarios
  constructor() {​​
    super();
    this.rol = 'Voluntario';
    this.habilidades = [];
    this.idiomas = [];
    this.participaciones = [];
  }​​
}​​
