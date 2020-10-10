import { Ubicacion } from './ubicacion';

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
  public idOng: string;

  constructor() {
    this.imagenes = [];
    this.ubicacion = new Ubicacion();
    this.idiomasDeseables =  [];
    this.areasConocimientoRelacionadas = [];
    this.participantes = [];
  }
}
