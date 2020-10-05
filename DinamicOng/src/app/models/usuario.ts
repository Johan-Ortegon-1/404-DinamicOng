import { Ubicacion } from './ubicacion';

export class Usuario {
  private id: string;
  private nombre: string;
  private correo: string;
  private telefonos: Array<string>;
  private rol: string;
  private ubicacion: Ubicacion;
  // --------------------------------------
  // TODO Colocar imagen
  // --------------------------------------

  constructor(id: string, nombre: string, correo: string, telefonos: Array<string>, rol: string, ubicacion: Ubicacion) {
    this.nombre = nombre;
    this.correo = correo;
    this.id = id;
    this.telefonos = telefonos;
    this.rol = rol;
    this.ubicacion = ubicacion;
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

}
