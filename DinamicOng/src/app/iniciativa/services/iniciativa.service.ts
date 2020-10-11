import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Ong } from 'src/app/models/ong';
import { Iniciativa } from '../../models/iniciativa';
import { OngService } from '../../ong/services/ong.service';

@Injectable({
  providedIn: 'root'
})
export class IniciativaService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage, private ongService: OngService) { }

  buscarIniciativa(iniciativa: Iniciativa) {
    return this.firestore.collection("iniciativas", ref => ref.where('idOng', '==', iniciativa.idOng)).snapshotChanges();
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
        console.log(ong.ubicacion.pais);
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

  // Función para subir imagenes a Firestorage
  subirImagenesIniciativa(iniciativa: Iniciativa) {
    console.log(iniciativa);
    let n = 1;
    iniciativa.imagenes.forEach(element => {
      this.firestorage.upload('/ImagenIniciativa_' + n + '-' + iniciativa.id, element);
      n++;
    });
  }

  obtenerImagenesIniciativa(id: string) {
    let ulrs: Array<string> = [];
    const storageRef = this.firestorage.storage.ref().child(id);
    storageRef.listAll().then(resp => {
      resp.items.forEach(imgRef => {
        imgRef.getDownloadURL().then(url => {
          ulrs.push(url);
          console.log(url);
        });
      });
    });
    return ulrs;
  }
}
