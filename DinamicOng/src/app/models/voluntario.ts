import { Usuario } from './usuario';
import { Conocimiento } from './conocimiento';

export class Voluntario extends Usuario {

    public habilidades: Conocimiento[];
    public idiomas: string[];
    public fechaNacimiento: Date;


    constructor() {
        super();
        this.rol = 'Voluntario';
        this.habilidades = [];
        this.idiomas = [];
    }
}