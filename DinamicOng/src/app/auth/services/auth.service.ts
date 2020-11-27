import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ong } from 'src/app/models/ong';
import { Voluntario } from 'src/app/models/voluntario';
import { Usuario } from '../../models/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { User } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

// Clase que representa el servicio para poder realizar acciones de autenticación y registro de usuarios
export class AuthService {

  // Metodo constructor para crear un objeto del servicio
  // Parámetros:
  // - afAuth: Objeto que permite el manejo de la autenticación con Firebase Authentication
  // - firestore: Objeto que permite el manejo de los datos con la base de datos de Firebase Firestore
  // - firestorage: Objeto que permite el manejo de las imagenes con Firebase Firestorage
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private firestorage: AngularFireStorage,
    private router: Router) { }

  // Metodo que realiza el query para poder consultar un usuario mediante el correo en Firestore
  // Parámetros:
  // - correo: Correo con el que se realizará la busqueda del usuario
  // Retorno: Un objeto Observador para poder suscribirse y recibir el usuario
  buscarRolByCorreo(correo: string) {
    return this.firestore.collection("usuarios", ref => ref.where('correo', '==', correo)).snapshotChanges();
  }

  // Metodo para realizar el login de un usuario de manera asincrona
  // Parámetros:
  // - email: Correo con el que se intenta loguear
  // - password: Constraseña con el que se intenta loguear
  // Retorno: Un booleano para saber el estado del proceso
  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Metodo para registrar una Ong
  // Parámetros:
  // - ong: Objeto de clase Ong el cual se va a registrar
  // - contrasena: Constraseña con el que se registrará la Ong
  // Retorno: El usuario de Firebase Authentication creado o null dependiendo del exito o fallo del proceso
  async registerOng(ong: Ong, contrasena: string) {
    try {
      const user = (await this.register(ong.correo, contrasena));
      if (user != null) {
        ong.id = user.user.uid;
        this.createUsuario(ong);
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Metodo para actualizar un Usuario
  // Parámetros:
  // - usuario: Objeto de clase Usuario cuya información se va a actualizar
  updateOng(usuario: Ong, b: boolean) {
    
    /*if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }*/
    //var bcorreo=true;
    if (b) {
      this.updateImagenONG(usuario);
    }


    var user = firebase.auth().currentUser;

    user.updateEmail(usuario.correo).then(function () {
    
    }).catch(function (error) {
      console.log("ERROR AL ACTUALIZAR EMAIL DE VOLUNTARIO");
     
    });
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).update(param);
    
  }


  // Metodo que crea un usuario en Firestore
  // Parámetros:
  // - usuario: Objeto de clase Usuario el cual se va a crear en Firestore
  updateImagenONG(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).set(param);
  }

  // Metodo para registrar un voluntario
  // Parámetros:
  // - voluntario: Objeto de clase Voluntario el cual se va a registrar
  // - contrasena: Constraseña con el que se registrará el voluntario
  // Retorno: El usuario de Firebase Authentication o null dependiendo del exito o fallo del proceso
  async registerVoluntario(voluntario: Voluntario, contrasena: string) {
    try {
      const user = (await this.register(voluntario.correo, contrasena));
      if (user != null) {
        // Insertar info voluntario
        voluntario.id = user.user.uid;
        this.createUsuario(voluntario);
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Metodo para actualizar un Usuario
  // Parámetros:
  // - usuario: Objeto de clase Usuario cuya información se va a actualizar
  updateVoluntario(usuario: Voluntario, b: boolean) {

    if (b) {
      this.updateImagenVoluntario(usuario);
    }


    var user = firebase.auth().currentUser;

    user.updateEmail(usuario.correo).then(function () {

    }).catch(function (error) {
      console.log("ERROR AL ACTUALIZAR EMAIL DE VOLUNTARIO")
      //var user=firebase.auth().currentUser;
      //var emailUser = user.email;
      //usuario.correo=emailUser;
      // mensaje de error
    });
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).update(param);
  }

  updateImagenVoluntario(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).set(param);
  }


  // Metodo para subir imagenes a Firestorage
  // Parámetros:
  // - usuario: Objeto de clase Usuario cuya imagen de perfil se va a subir
  subirImagenPerfil(usuario: Usuario) {
    this.firestorage.upload('/ImagenPerfil-' + usuario.id, usuario.imagenPerfil);
  }

  // Metodo que crea un usuario en Firestore
  // Parámetros:
  // - usuario: Objeto de clase Usuario el cual se va a crear en Firestore
  createUsuario(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).set(param);
  }

  // Metodo para actualizar un Usuario
  // Parámetros:
  // - usuario: Objeto de clase Usuario cuya información se va a actualizar
  updateUsuario(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    this.firestore.collection('usuarios').doc(usuario.id).update(param);
  }

  // Metodo para realizar el registro de un usuario con correo y contraseña en Firebase Authentication
  // Parámetros:
  // - correo: Correo del usuario que se va a registrar
  // - contrasena: Constraseña del usuario que se va registrar
  // Retorno: El usuario de Firebase Authentication o null dependiendo del exito o fallo del proceso
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Metodo para realizar el logout de un usuario
  async logout() {
    try {
      await this.afAuth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para obtener la información del usuario actualmente logueado
  // Retorno: El usuario de Firebase Authentication que se encuentra logueado actualmente
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
