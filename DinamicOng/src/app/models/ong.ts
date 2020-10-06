import { Ubicacion } from './ubicacion';
import { Usuario } from './usuario';

export class Ong extends Usuario {

  private vision: string;
  private mision: string;

  constructor(id: string, nombre: string, correo: string, telefonos: Array<string>, ubicacion: Ubicacion, img: string, mision: string, vision: string) {
    super(id, nombre, correo, telefonos, 'Ong', ubicacion, img);
    this.mision = mision;
    this.vision = vision;
  }

  get getMision(): string {
    return this.mision;
  }

  set setMision(mision: string) {
    this.mision = mision;
  }

  get getVision(): string {
    return this.vision;
  }

  set setVision(vision: string) {
    this.vision = vision;
  }

}
