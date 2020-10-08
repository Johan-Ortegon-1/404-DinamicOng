import { Component, OnInit } from '@angular/core'
import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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
            let usr = elem.payload.doc.data();
            console.log(usr);
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
