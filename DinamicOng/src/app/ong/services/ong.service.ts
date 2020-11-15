import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Ong } from '../../models/ong';
import { AuthService } from '../../auth/services/auth.service';
import { strict } from 'assert';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage, private authService: AuthService) { }

  consultarOngByID(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get();
  }

  // Función que crea un usuario en Firestore
  updateOng(ong: Ong) {
    this.authService.updateUsuario(ong);
  }

  obtenerImagenPerfil(id: string) {
    return this.firestorage.storage.ref().child('ImagenPerfil-' + id).getDownloadURL();
  }
}
