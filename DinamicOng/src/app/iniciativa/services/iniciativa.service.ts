import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Ong } from 'src/app/models/ong';
import { Iniciativa } from '../../models/iniciativa';
import { OngService } from '../../ong/services/ong.service';
import { VoluntarioService } from '../../voluntario/services/voluntario.service';
import { Voluntario } from '../../models/voluntario';
import { Solicitud } from '../../models/solicitud';

@Injectable({
  providedIn: 'root'
})

// Clase que representa el servicio para poder realizar acciones sobre las iniciativas
export class IniciativaService {

  // Metodo constructor para crear un objeto del servicio
  // Parámetros:
  // - firestore: Objeto que permite el manejo de los datos con la base de datos de Firebase Firestore
  // - firestorage: Objeto que permite el manejo de las imagenes con Firebase Firestorage
  // - ongService: Objeto que permite realizar acciones sobre las Ong's
  // - voluntarioService: Objeto que permite realizar acciones sobre los voluntarios
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage,
    private ongService: OngService, private voluntarioService: VoluntarioService) { }

  // Metodo que realiza el query para poder consultar las iniciativas en Firestore
  // Retorno: Un objeto Observador para poder suscribirse y recibir las iniciativas
  buscarIniciativas() {
    return this.firestore.collection("iniciativas").snapshotChanges();
  }

  // Metodo que crea una iniciativa en Firestore
  // Parámetros:
  // - iniciativa: Iniciativa a crear
  crearIniciativa(iniciativa: Iniciativa) {
    if (localStorage.getItem('uid') != null) {
      const idOng = localStorage.getItem('uid');
      const id = this.firestore.createId();
      const doc = this.firestore.collection('iniciativas').doc(id);
      iniciativa.id = id;
      iniciativa.idOng = idOng;

      let ong: Ong;

      this.ongService.consultarOngByID(idOng).then(item => {

        ong = item.data() as Ong;
        ong.iniciativas.push(iniciativa.id);
        this.ongService.updateOng(ong);
        this.subirImagenesIniciativa(iniciativa);
        iniciativa.imagenes = [];
        const param = JSON.parse(JSON.stringify(iniciativa));
        doc.set(param);

      }, error => {
        console.log(error);
      });
    }
  }

  // Metodo que obtiene la fecha de hoy
  // Parámetros:
  // - formato: Número entre 1 y 2 que define el formato con el que se obtendrá la fecha
  // Retorno: Un string con la fecha de hoy
  obtenerFechaHoy(formato: number) {
    const dateOb = new Date();
    const date = ("0" + dateOb.getDate()).slice(-2);
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    let result = null;
    if (formato == 1) {
      result = date + '/' + month + '/' + year;
    } else if (formato == 2) {
      result = year + '-' + month + '-' + date;
    }
    return result;
  }

  // Metodo que indica si una fecha es menor a la de hoy (ya pasó esa fecha)
  // Parámetros:
  // - f1: fecha a comparar
  // Retorno: Bandera que indica si la fecha ya pasó
  compararFechaMenorIgualHoy(f1: Date) {
    const fecha1 = new Date(f1);
    const fecha2 = new Date(this.obtenerFechaHoy(2));
    if (fecha1 <= fecha2) {
      return true;
    } else {
      return false;
    }
  }

  // Metodo para subir las imagenes de una iniciativa a Firestorage
  // Parámetros:
  // - iniciativa: Iniciativa a la que se le subiran las imagenes
  subirImagenesIniciativa(iniciativa: Iniciativa) {
    console.log(iniciativa);
    let n = 1;
    iniciativa.imagenes.forEach(element => {
      this.firestorage.upload('/' + iniciativa.id + '/ImagenIniciativa_' + n, element);
      n++;
    });
  }
  // Metodo para subir las imagenes de una iniciativa a Firestorage
  // Parámetros:
  // - iniciativa: Iniciativa a la que se le subiran las imagenes
  updateImagenesIniciativa(iniciativa: Iniciativa, cantidad: number) {
    let n = cantidad + 1 ; 
    iniciativa.imagenes.forEach(element => {
      this.firestorage.upload('/' + iniciativa.id + '/ImagenIniciativa_' + n, element);
      n++;
    });
  }
  eliminarImagenesIniciativa(iniciativa: Iniciativa, eliminar: Array<string> )
  {
    eliminar.forEach(element => {
      console.log("No se elimina"); 
      //this.firestore.collection('iniciativas').doc(iniciativa.id).collection('imagenes').doc().delete();
    });
  }

  // Metodo que consulta una Iniciativa en Firestore segun el id
  // Parámetros:
  // - id: Identificador de la iniciativa a consultar
  // Retorno: La iniciativa o null
  consultarIniciativaByID(id: string) {
    return this.firestore.collection('iniciativas').doc(id).ref.get();
  }

  // Metodo que actualiza una iniciativa
  // Parámetros:
  // - iniciativa: Iniciativa a actualizar
  updateIniciativa(iniciativa: Iniciativa) {
    
    const param = JSON.parse(JSON.stringify(iniciativa));
    this.firestore.collection('iniciativas').doc(iniciativa.id).update(param);
    
  }
  // Metodo que actualiza una iniciativa
  // Parámetros:
  // - iniciativa: Iniciativa a actualizar
  updateIniciativa2(iniciativa: Iniciativa,cantidad: number, eliminar: Array<string> ) {
    
    const param = JSON.parse(JSON.stringify(iniciativa));
    this.firestore.collection('iniciativas').doc(iniciativa.id).update(param);
    const idOng = localStorage.getItem('uid');
    const id = this.firestore.createId();
    const doc = this.firestore.collection('iniciativas').doc(id);
    this.ongService.consultarOngByID(idOng).then(item => {
      this.updateImagenesIniciativa(iniciativa,cantidad);
      this.eliminarImagenesIniciativa(iniciativa, eliminar)
      const param = JSON.parse(JSON.stringify(iniciativa));
      doc.set(param);
    }, error => {
      console.log(error);
    });
  }
  // Metodo que obtiene las URL's de las imagenes de una iniciativa de Firestorage
  // Parámetros:
  // - id: Identificador de la iniciativa
  // Retorno: Una lista con las URL's de las imagenes
  obtenerImagenesIniciativa(id: string) {
    let ulrs: Array<string> = [];
    const storageRef = this.firestorage.storage.ref().child(id);
    storageRef.listAll().then(resp => {
      resp.items.forEach(imgRef => {
        imgRef.getDownloadURL().then(url => {
          ulrs.push(url);
        });
      });
    });
    return ulrs;
  }


  obtenerImagenesDescargadas(id: string) {
    let ulrs: Array<string> = [];
    let blobs = [];
    const storageRef = this.firestorage.storage.ref().child(id);
    storageRef.listAll().then(resp => {
      resp.items.forEach(imgRef => {
        imgRef.getDownloadURL().then(url => {
          ulrs.push(url);
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
            blobs.push(blob); 
          };
          xhr.open('GET', url);
          xhr.send();
        });
      });
    });
    return blobs;
  }


  // Metodo que obtiene los participantes según los id's
  // Parámetros:
  // - ids: Lista con los id's de los voluntarios a consultar
  // Retorno: Lista con los objetos de voluntarios
  obtenerParticipantes(ids: Array<string>): Array<Voluntario> {
    let participantes = [];
    ids.forEach(id => {
      this.voluntarioService.consultarVoluntarioByID(id).then(resp => {
        let part: Voluntario = resp.data() as Voluntario;
        this.voluntarioService.obtenerImagenPerfil(part.id).then(img => {
          part.imagenPerfil = img;
          participantes.push(part);
        });
      });
    });
    return participantes;
  }

  // Metodo que realiza la solicitud de postulación
  // Parámetros:
  // - iniciativa: Iniciativa a la que se postula
  // - idVol: Identificador del voluntario que realiza la solicitud
  solicitarUnirse(iniciativa: Iniciativa, idVol: string) {
    let solicitud = new Solicitud();
    solicitud.contestado = false;
    solicitud.aceptado = false;
    solicitud.idIniciativa = iniciativa.id;
    solicitud.idOng = iniciativa.idOng;

    solicitud.idVoluntario = idVol;
    const idSol = this.crearSolicitud(solicitud);
    iniciativa.solicitudes.push(idSol);
    this.updateIniciativa(iniciativa);
  }

  // Metodo que crea la solicitud de postulación en Firestore
  // Parámetros:
  // - solicitud: Objeto de la solicitud a ingresar a Firestore
  // Retorno: El identificador de la solicitud creada
  crearSolicitud(solicitud: Solicitud): string {
    const id = this.firestore.createId();
    solicitud.id = id;
    const param = JSON.parse(JSON.stringify(solicitud));
    this.firestore.collection('solicitudes').doc(id).set(param);
    return id;
  }

  // Metodo que consulta una solicitud de un voluntario a una iniciativa
  // Parámetros:
  // - idVol: Identificador del voluntario
  // - idInic: Identificador de la iniciativa
  // Retorno: La solicitud que coincida con esa búsqueda o null
  consultarSolicitud(idVol: string, idInic: string) {
    return this.firestore.collection('solicitudes').ref.where('idVoluntario', '==', idVol)
      .where('idIniciativa', '==', idInic).get();
  }

  // Metodo que consulta una solicitud con el id
  // Parámetros:
  // - id: Identificador de la solicitud
  // Retorno: La solicitud que coincida con esa búsqueda o null
  consultarSolicitudByID(id: string) {
    return this.firestore.collection('solicitudes').doc(id).ref.get();
  }

  // Metodo que actualiza una solicitud
  // Parámetros:
  // - solicitud: Solicitud a actualizar
  updateSolicitud(solicitud: Solicitud){
    const param = JSON.parse(JSON.stringify(solicitud));
    this.firestore.collection('solicitudes').doc(solicitud.id).update(param);
  }

  // Metodo que consulta todas las solicitudes de Firestore
  // Retorno: Un objeto Observador para poder suscribirse y recibir las solicitudes
  consultarTodasSolicitudes() {
    return this.firestore.collection('solicitudes').snapshotChanges();
  }
}
