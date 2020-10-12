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

}
