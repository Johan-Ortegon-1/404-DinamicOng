import { Solicitud } from './solicitud';
import { Ubicacion } from './ubicacion';
import { Valoracion } from './valoracion';

export class Iniciativa {

  public id: string;
  public nombre: string;
  public descripcion: string;
  public cantidadMinVoluntarios: number;
  public cantidadMaxVoluntarios: number;
  public fechaInicio: Date;
  public fechaFinalizacion: Date;
  public imagenes: Array<string>;
  public ubicacion: Ubicacion;
  public idiomasDeseables: Array<string>;
  public areasConocimientoRelacionadas: Array<string>;
  public participantes: Array<string>;
  //lo necesito
  public idOng: string;
  public imagenPerfil: string;
  public nombreOng: string;

  public valoraciones: Array<Valoracion>;
  public solicitudes: Array<string>;

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
