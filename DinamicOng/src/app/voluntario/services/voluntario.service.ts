import { Voluntario } from './../../models/voluntario';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

// Clase que representa el servicio para poder realizar acciones sobre los Voluntarios
export class VoluntarioService {

  // Metodo constructor para crear un objeto del servicio
  // Parámetros:
  // - firestore: Objeto que permite el manejo de los datos con la base de datos de Firebase Firestore
  // - firestorage: Objeto que permite el manejo de las imagenes con Firebase Firestorage
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  // Metodo que consulta un Voluntario en Firestore segun el id
  // Parámetros:
  // - id: Identificador del Voluntario a consultar
  // Retorno: El Voluntario o null
  consultarVoluntarioByID(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get();
  }

  // Metodo que consulta la imagen de perfil de un Voluntario en Firestore segun el id
  // Parámetros:
  // - id: Identificador del Voluntario a consultar
  // Retorno: La URL de la imagen
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
