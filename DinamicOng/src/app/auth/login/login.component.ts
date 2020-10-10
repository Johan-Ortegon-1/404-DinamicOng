import { Component, OnInit } from '@angular/core'
import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user = 'user';
  password = 'password';

  constructor(private router: Router, private auth: AuthService, private firestore: AngularFirestore) { }

  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.auth.login(this.user, this.password).then(response=> {
      if (response) {
        this.firestore.collection("usuarios", ref => ref.where('correo', '==', this.user)).snapshotChanges().subscribe(data => {
          data.map(elem => {
            let usr = new Usuario();
            //usr.correo = elem.payload.doc.data().correo;
            //usr.rol = elem.payload.doc.data().rol;
            console.log(elem.payload.doc.data());
          });
        });
      }
      else {
        alert('error en log in')
      }
    });
  }

  ngOnInit(): void {
  }
}
