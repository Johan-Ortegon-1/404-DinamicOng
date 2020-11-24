import { Mensaje } from './mensaje';

// Clase que representa el modelo de una conversación
export class Conversacion {​​

  public id: string; // Identificador unico de la conversación
  public mensajes: Array<Mensaje>; // Lista de mensajes en la conversación
  public idOng: string; // Identificador de la Ong que mantiene una conversación con el voluntario
  public idVoluntario: string; // Identificador del Voluntario que mantiene una conversación con la Ong

  // Metodo constructor para crear un objeto de clase Conversacion
  // Se inicializan listas y valores necesarios
  constructor() {​​
    this.mensajes = [];
  }​​
}
