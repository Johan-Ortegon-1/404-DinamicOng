import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor(private firestore: AngularFirestore, private firestorage: AngularFireStorage, private authService: AuthService) { }

  consultarVoluntarioByID(id: string) {
    return this.firestore.collection('usuarios').doc(id).ref.get();
  }

}
