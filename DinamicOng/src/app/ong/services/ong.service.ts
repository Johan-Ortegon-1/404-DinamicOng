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

// Clase que representa el servicio para poder realizar acciones sobre las Ong's
export class OngService {

  // Metodo constructor para crear un objeto del servicio
  // Parámetros:
  // - authService: Objeto que permite el manejo de la autenticación con Firebase Authentication
  // - firestore: Objeto que permite el manejo de los datos con la base de datos de Firebase Firestore
  // - firestorage: Objeto que permite el manejo de las imagenes con Firebase Firestorage
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage, private authService: AuthService) { }

  // Metodo que consulta una Ong por el id en Firestore
  // Parámetros:
  // - id: Identificador de la Ong
  // Retorno: La Ong o null
  consultarOngByID(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get();
  }

  // Metodo que actualiza una Ong en Firestore
  // Parámetros:
  // - ong: Objecto de la Ong
  updateOng(ong: Ong) {
    this.authService.updateUsuario(ong);
  }

  // Metodo que obtiene la URL de la imagen de perfil de la Ong
  // Parámetros:
  // - id: Identificador de la Ong
  // Retorno: la Url
  obtenerImagenPerfil(id: string) {
    return this.firestorage.storage.ref().child('ImagenPerfil-' + id).getDownloadURL();
  }
}
