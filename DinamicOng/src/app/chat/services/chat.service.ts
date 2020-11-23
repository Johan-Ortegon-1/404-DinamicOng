import { Injectable } from '@angular/core';
import { Conversacion } from '../../models/conversacion';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

// Clase que representa el servicio para poder realizar acciones sobre las conversaciones y sus mensajes
export class ChatService {

  // Metodo constructor para crear un objeto del servicio
  // Parámetros:
  // - firestore: Objeto que permite el manejo de los datos con la base de datos de Firebase Firestore
  // - firestorage: Objeto que permite el manejo de las imagenes con Firebase Firestorage
  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  // Metodo que obtiene todas las conversaciones de Firestore
  // Retorno: Un objeto Observador para poder suscribirse y recibir las conversaciones
  obtenerConversaciones() {
    return this.firestore.collection('conversaciones').snapshotChanges();
  }

  // Metodo que crea una conversación en Firestore
  // Parámetros:
  // - conver: Conversación a crear
  // Retorno: Identificador de la conversación creada
  crearConversacion(conver: Conversacion) {
    const id = this.firestore.createId();
    conver.id = id;
    const doc = this.firestore.collection('conversaciones').doc(id);
    const param = JSON.parse(JSON.stringify(conver));
    doc.set(param);
    return id;
  }

  // Metodo para actualizar una conversación
  // Parámetros:
  // - conver: Objeto de clase Conversacion cuya información se va a actualizar
  actualizarConversacion(conver: Conversacion) {
    const param = JSON.parse(JSON.stringify(conver));
    this.firestore.collection('conversaciones').doc(conver.id).update(param);
  }

  // Metodo que consulta una conversación por el id en Firestore
  // Parámetros:
  // - id: Identificador de la conversación
  // Retorno: La conversación o null
  obtenerConversacionById(id: string) {
    return this.firestore.collection('conversaciones').doc(id).snapshotChanges();
  }

  // Metodo que consulta una conversación por el id de la Ong y el id del voluntario en Firestore
  // Parámetros:
  // - idOng: Identificador de la Ong
  // - idVol: Identificador del voluntario
  // Retorno: La conversación o null
  obtenerConversacionByIdOngIdVol(idOng: string, idVol: string) {
    return this.firestore.collection('conversaciones').ref.where('idOng', '==', idOng).where('idVoluntario', '==', idVol).get();
  }

  // Metodo que obtiene la fecha y hora de hoy
  // Retorno: Un string con la fecha de hoy
  obtenerFechaHoraHoy(format: number) {
    const dateOb = new Date();
    const date = ("0" + dateOb.getDate()).slice(-2);
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    const hour = dateOb.getHours();
    const minutes = dateOb.getMinutes();
    const sec = dateOb.getSeconds();
    const h = hour < 10 ? '0' + hour : hour;
    const m = minutes < 10 ? '0' + minutes : minutes;
    const s = sec < 10 ? '0' + sec : sec;
    let result;

    if (format == 1) {
      result = date + '/' + month + '/' + year + ' ' + h + ':' + m + ':' + s;
    } else if (format == 2) {
      result = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + s;
    }

    return result;
  }

  convertirFechaHora(fh: Date) {
    const date = ("0" + fh.getDate()).slice(-2);
    const month = ("0" + (fh.getMonth() + 1)).slice(-2);
    const year = fh.getFullYear();
    const hour = fh.getHours();
    const minutes = fh.getMinutes();
    const h = hour < 10 ? '0' + hour : hour;
    const m = minutes < 10 ? '0' + minutes : minutes;

    const result = date + '/' + month + '/' + year + ' ' + h + ':' + m;
    return result;
  }

  convertirFecha(f: Date) {
    const date = ("0" + f.getDate()).slice(-2);
    const month = ("0" + (f.getMonth() + 1)).slice(-2);
    const year = f.getFullYear();

    const result = date + '/' + month + '/' + year;
    return result;
  }

}
