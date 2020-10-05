export class Ubicacion {
  private ciudad: string;
  private pais: string;
  private direccion: string;

  constructor(ciudad: string, pais: string, direccion: string) {
    this.ciudad = ciudad;
    this.pais = pais;
    this.direccion = direccion;
  }

  get getCiudad(): string {
    return this.ciudad;
  }

  set setCiudad(ciudad: string) {
    this.ciudad = ciudad;
  }

  get getPais(): string {
    return this.pais;
  }

  set setPais(pais: string) {
    this.pais = pais;
  }

  get getDireccion(): string {
    return this.direccion;
  }

  set setDireccion(direccion: string) {
    this.direccion = direccion;
  }

}
