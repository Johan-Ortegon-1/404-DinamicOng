import { Ubicacion } from './ubicacion';

export class Usuario {
  public id: string;
  public nombre: string;
  public correo: string;
  public telefonos: Array<string>;
  public rol: string;
  public ubicacion: Ubicacion;
  public imagenPerfil: string;

  constructor() {
    this.telefonos = [];
    this.ubicacion = new Ubicacion();
  }

  /* constructor(id: string, nombre: string, correo: string, telefonos: Array<string>, rol: string, ubicacion: Ubicacion, img: string) {
    this.nombre = nombre;
    this.correo = correo;
    this.id = id;
    this.telefonos = telefonos;
    this.rol = rol;
    this.ubicacion = ubicacion;
    this.imagenPerfil = img;
  }

  get getNombre(): string {
    return this.nombre;
  }

  set setNombre(nom: string) {
    this.nombre = nom;
  }

  get getCorreo(): string {
    return this.correo;
  }

  set setCorreo(correo: string) {
    this.correo = correo;
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getTelefonos(): Array<string> {
    return this.telefonos;
  }

  set setTelefonos(telefonos: Array<string>) {
    this.telefonos = telefonos;
  }

  get getRol(): string {
    return this.rol;
  }

  set setRol(rol: string) {
    this.rol = rol;
  }

  get getImagenPerfil(): string {
    return this.imagenPerfil;
  }

  set setImagenPerfil(img: string) {
    this.imagenPerfil = img;
  } */

}
