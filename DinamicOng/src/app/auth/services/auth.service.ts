import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import { Ong } from 'src/app/models/ong';

@Injectable()

export class AuthService {

  public user: User;

  constructor(public afAuth: AngularFireAuth) { }

  // Función para realizar el login
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async registerOng(ong: Ong, contrasena: string) {
    try {
      let user = this.register(ong.getCorreo, contrasena);
      // Insertar info ONG

      return user;
    } catch (error) {
      console.log(error);
    }
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
