import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './../../models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
// Clase que representa el componente de inicio de sesion del usuario
export class LoginComponent implements OnInit, OnDestroy {
  user = '';
  password = '';
  public suscripcion: Subscription;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  // - auth: Objeto que permite manejar datos de autenticación
  constructor(private router: Router, private auth: AuthService) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
   if (localStorage.getItem('uid')) {
      const rol = localStorage.getItem('rol');
      if (rol === 'Ong') {
        this.router.navigate(['/ong']);
      } else if (rol === 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }
    }
  }

  // Metodo que se ejecuta al eliminar el componente
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  // Metodo que se encarga de hacer el inicio de sesion de un usuario
  // y decidir que rol tiene para navegacion de rutas adecuada
  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.auth.login(this.user, this.password).then(response => {
      if (response) {
        this.suscripcion = this.auth.buscarRolByCorreo(this.user).subscribe((data: any) => {
          data.map(elem => {
            const usr = elem.payload.doc.data();
            localStorage.setItem('uid', usr.id);
            if (usr.rol === 'Ong') {
              localStorage.setItem('rol', 'Ong');
              this.router.navigate(['/ong']);
              console.log('nav ong');
            } else {
              localStorage.setItem('rol', 'Voluntario');
              this.router.navigate(['/voluntario']);
              console.log('nav voluntario');
            }
          });
        });
      } else {
        alert('error en log in');
      }
    });
  }
}
