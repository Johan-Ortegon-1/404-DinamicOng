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

  constructor(private router: Router, private auth: AuthService) { }

  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.auth.login(this.user, this.password).then(response=> {
      if (response) {
        this.auth.buscarRolByCorreo(this.user).subscribe((data:any) => {
          data.map(elem => {
            let usr = elem.payload.doc.data();
            localStorage.setItem('uid', usr.id);
            if(usr.rol == 'Ong') {
              //navegar a inicio ong
              console.log('nav ong');
            }
            else {
              //navegar a inicio voluntario
              console.log('nav voluntario');
            }
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
