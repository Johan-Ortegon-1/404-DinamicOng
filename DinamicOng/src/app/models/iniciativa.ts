import { Solicitud } from './solicitud';
import { Ubicacion } from './ubicacion';
import { Valoracion } from './valoracion';

// Clase que representa el modelo de la Iniciativa
export class Iniciativa {

  public id: string; // Identificador único de la Iniciativa
  public nombre: string; // Nombre de la iniciativa
  public descripcion: string; // Descripción de la iniciativa
  public cantidadMinVoluntarios: number; // Cantidad mínima de voluntarios deseados
  public cantidadMaxVoluntarios: number; // Cantidad máxima de voluntarios permitidos
  public fechaInicio: Date; // Fecha de Iniciación de la iniciativa
  public fechaFinalizacion: Date; // Fecha de Finalización de la iniciativa
  public imagenes: Array<string>; // Lista con las URL's de las imagenes que tenga la iniciativa
  public ubicacion: Ubicacion; // Ubicación de la iniciativa, un objeto de tipo Ubicación
  public idiomasDeseables: Array<string>; // Lista de idiomas deseables para la iniciativa
  public areasConocimientoRelacionadas: Array<string>; // Lista de las areas de conocimiento deseables para la iniciativa
  public participantes: Array<string>; // Lista de id's de los voluntarios que participan en la iniciativa
  public idOng: string; // Id de la ONG que crea la iniciativa
  public imagenPerfil: string; // URL que representa la imagen de perfil de la ONG que crea la iniciativa
  public nombreOng: string; // Nombre de la ONG que crea la iniciativa
  public valoraciones: Array<Valoracion>; // Lista de objetos Valoracion, que representa las valoraciones que dejan los voluntarios
  public solicitudes: Array<string>; // Lista de id's de las solicitudes que ha recibido la iniciativa

  // Metodo constructor para crear un objeto de clase Iniciativa
  // Se inicializan listas y valores necesarios
  constructor() {
    this.imagenes = [];
    this.solicitudes = [];
    this.valoraciones = [];
    this.ubicacion = new Ubicacion();
    this.idiomasDeseables =  [];
    this.areasConocimientoRelacionadas = [];
    this.participantes = [];
  }
}
