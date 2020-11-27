import { Ubicacion } from './ubicacion';

// Clase que representa el modelo de un Usuario
export class Usuario {
  public id: string; // Identificador único del usuario
  public nombre: string; // Nombre y apellido del usuario
  public correo: string; // Correo del usuario
  public telefonos: Array<string>; // Lista de telefonos que maneja el usuario
  public rol: string; // Rol que tiene el usuario (ONG o Voluntario)
  public ubicacion: Ubicacion; // Ubicación del usuario, un objeto de tipo Ubicación
  public imagenPerfil: string; // URL de la imagen que tiene el usuario

  // Metodo constructor para crear un objeto de clase Voluntario
  // Se inicializan listas y valores necesarios
  constructor() {
    this.telefonos = [];
    this.ubicacion = new Ubicacion();

  }
 

}
