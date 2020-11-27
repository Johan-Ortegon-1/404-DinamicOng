// Clase que representa el modelo de la solicitud que envia un Voluntario para postularse
export class Solicitud {
  public contestado: boolean; // Bandera que identifica si la ONG responsable de la iniciativa ha contestado la solicitud
  public aceptado: boolean; // Bandera que identifica si la ONG responsable de la iniciativa ha aceptado al Voluntario
  public id: string; // Identificador único de la solicitud
  public idIniciativa: string; // Id de la iniciativa a la que se envia la solicitud
  public idVoluntario: string; // Id del voluntario que envia la solicitud
  public idOng: string; // Id de la ONG responsable de la iniciativa

  // Metodo constructor para crear un objeto de clase Solicitud
  constructor() {

  }
}
