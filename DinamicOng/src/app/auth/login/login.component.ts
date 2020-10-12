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

  ngOnInit(): void {
    /*
    if (localStorage.getItem('uid')) {
      const rol = localStorage.getItem('rol');
      if (rol == 'Ong') {
        this.router.navigate(['/ong']);
      } else if (rol == 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }

    }*/

  }

  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.auth.login(this.user, this.password).then(response=> {
      if (response) {
        this.auth.buscarRolByCorreo(this.user).subscribe((data:any) => {
          data.map(elem => {
            let usr = elem.payload.doc.data();
            localStorage.setItem('uid', usr.id);
            if(usr.rol == 'Ong') {
              localStorage.setItem('rol', 'Ong');
              this.router.navigate(['/ong']);
              console.log('nav ong');
            }
            else {
              localStorage.setItem('rol', 'Voluntario');
              this.router.navigate(['/voluntario']);
              console.log('nav voluntario');
            }
          });
        });
      }
      else {
        alert('error en log in');
      }
    });
  }
}
