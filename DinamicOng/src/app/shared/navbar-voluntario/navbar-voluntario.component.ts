import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar-voluntario',
  templateUrl: './navbar-voluntario.component.html',
  styleUrls: ['./navbar-voluntario.component.css']
})
export class NavbarVoluntarioComponent implements OnInit {

  public selected = [
    false,
    false,
    false,
    false
  ];

  constructor(private route: Router,private auth: AuthService) {
    this.route.events.subscribe(val => {
      this.actualizarCambios();
    });
   }

  ngOnInit(): void {
    this.actualizarCambios();
  }

  actualizarCambios() {

    this.selected = [
      false,
      false,
      false,
      false
    ];

    const ruta = this.route.url;

    if (ruta == '/voluntario/inicio') {
      this.selected[0] = true;
    } else if (ruta == '/voluntario/mi-perfil') {
      this.selected[1] = true;
    } else if (ruta == '/voluntario/susripciones') {
      this.selected[2] = true;
    } else if (ruta == '/voluntario/participaciones') {
      this.selected[3] = true;
    }
  }


  logout(){

    localStorage.clear();
    this.auth.logout();
  }

}
