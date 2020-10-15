import { Voluntario } from './../../models/voluntario';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  consultarVoluntarioByID(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get();
  }

  obtenerImagenPerfil(id: string) {
    return this.firestorage.storage.ref().child('ImagenPerfil-' + id).getDownloadURL();
  }
  buscarVoluntario() {
    return this.firestore.collection('usuarios', ref => ref.where('rol', '==', 'Voluntario')).snapshotChanges();
  }

  updateVoluntario(voluntario: Voluntario) {
    const param = JSON.parse(JSON.stringify(voluntario));
    this.firestore.collection('usuarios').doc(voluntario.id).update(param);
  }

}
