import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from 'firebase';
import { Ong } from 'src/app/models/ong';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user: User;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  // Función para realizar el login
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // Función para registrar una Ong
  async registerOng(ong: Ong, contrasena: string) {
    try {
      const user = this.register(ong.getCorreo, contrasena);
      // Insertar info ONG
      ong.setId = (await user).user.uid;
      this.createUsuario(ong);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  // Función que crea un usuario en Firestore
  createUsuario(usuario: Usuario) {
    const param = JSON.parse(JSON.stringify(usuario));
    return this.firestore.collection('usuarios').doc(usuario.getId).set(param);
  }

  // Función para realizar el registro con usuario y contraseña
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
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
