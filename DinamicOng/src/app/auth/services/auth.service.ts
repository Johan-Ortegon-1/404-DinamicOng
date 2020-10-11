import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import { Ong } from 'src/app/models/ong';
import { Voluntario } from 'src/app/models/voluntario';
import { Usuario } from '../../models/usuario';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user: User;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private firestorage: AngularFireStorage) { }

  buscarRolByCorreo(correo: string) {
    return this.firestore.collection("usuarios", ref => ref.where('correo', '==', correo)).snapshotChanges();
  }

  // Función para realizar el login
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Función para registrar una Ong
  async registerOng(ong: Ong, contrasena: string) {
    try {
      const user = (await this.register(ong.correo, contrasena));
      if (user != null) {
        // Insertar info ONG
        ong.id = user.user.uid;
        this.createUsuario(ong);
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Funciona para registrar un voluntario
  async registerVoluntario(voluntario: Voluntario, contrasena: string) {
    try {
      const user = (await this.register(voluntario.correo, contrasena));
      if (user != null) {
        // Insertar info ONG
        voluntario.id = user.user.uid;
        this.createUsuario(voluntario);
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Función para subir imagenes a Firestorage
  subirImagenPerfil(usuario: Usuario) {
    this.firestorage.upload('/ImagenPerfil-' + usuario.id, usuario.imagenPerfil);
  }

  // Función que crea un usuario en Firestore
  createUsuario(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    return this.firestore.collection('usuarios').doc(usuario.id).set(param);
  }

  updateUsuario(usuario: Usuario) {
    if (usuario.imagenPerfil != null && usuario.imagenPerfil != '') {
      this.subirImagenPerfil(usuario);
    }
    usuario.imagenPerfil = '';
    const param = JSON.parse(JSON.stringify(usuario));
    return this.firestore.collection('usuarios').doc(usuario.id).update(param);
  }

  // Función para realizar el registro con usuario y contraseña
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Función para realizar el logout
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  // Función para obtener info del usuario actual
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
