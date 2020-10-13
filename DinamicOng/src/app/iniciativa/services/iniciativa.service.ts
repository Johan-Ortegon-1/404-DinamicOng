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
export class IniciativaService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage,
    private ongService: OngService, private voluntarioService: VoluntarioService) { }

  buscarIniciativa() {
    return this.firestore.collection("iniciativas").snapshotChanges();
  }

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

  obtenerFechaHoy(formato: number) {
    const dateOb = new Date();
    // adjust 0 before single digit date
    const date = ("0" + dateOb.getDate()).slice(-2);

    // current month
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

    // current year
    const year = dateOb.getFullYear();

    let result = null;

    if (formato == 1) {
      result = date + '/' + month + '/' + year;
    } else if (formato == 2) {
      result = year + '-' + month + '-' + date;
    }

    return result;
  }

  compararFechaMenorIgualHoy(f1: Date) {
    const fecha1 = new Date(f1);
    const fecha2 = new Date(this.obtenerFechaHoy(2));
    if (fecha1 <= fecha2) {
      return true;
    } else {
      return false;
    }
  }

  // Función para subir imagenes a Firestorage
  subirImagenesIniciativa(iniciativa: Iniciativa) {
    console.log(iniciativa);
    let n = 1;
    iniciativa.imagenes.forEach(element => {
      this.firestorage.upload('/' + iniciativa.id + '/ImagenIniciativa_' + n, element);
      n++;
    });
  }

  consultarIniciativaByID(id: string) {
    return this.firestore.collection('iniciativas').doc(id).ref.get();
  }

  updateIniciativa(iniciativa: Iniciativa) {
    const param = JSON.parse(JSON.stringify(iniciativa));
    this.firestore.collection('iniciativas').doc(iniciativa.id).update(param);
  }

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

  solicitarUnirse(iniciativa: Iniciativa, idVol: string) {
    let solicitud = new Solicitud();
    solicitud.contestado = false;
    solicitud.aceptado = false;
    solicitud.idIniciativa = iniciativa.id;
    console.log('id iniciativa', solicitud.idIniciativa);
    solicitud.idOng = iniciativa.idOng;

    console.log('id iniciativa', solicitud.idOng);
    solicitud.idVoluntario = idVol;
    const idSol = this.crearSolicitud(solicitud);
    iniciativa.solicitudes.push(idSol);
    this.updateIniciativa(iniciativa);
  }

  crearSolicitud(solicitud: Solicitud): string {
    const id = this.firestore.createId();
    solicitud.id = id;
    const param = JSON.parse(JSON.stringify(solicitud));
    this.firestore.collection('solicitudes').doc(id).set(param);
    return id;
  }

  consultarSolicitud(idVol: string, idInic: string) {
    return this.firestore.collection('solicitudes').ref.where('idVoluntario', '==', idVol)
      .where('idIniciativa', '==', idInic).get();
  }

  consultarSolicitudByID(id: string) {
    return this.firestore.collection('solicitudes').doc(id).ref.get();
  }
  updateSolicitud(solicitud: Solicitud){
    const param = JSON.parse(JSON.stringify(solicitud));
    this.firestore.collection('solicitudes').doc(solicitud.id).update(param);
  }

}
