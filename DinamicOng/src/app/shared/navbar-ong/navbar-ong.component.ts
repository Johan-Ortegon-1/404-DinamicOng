import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar-ong',
  templateUrl: './navbar-ong.component.html',
  styleUrls: ['./navbar-ong.component.css']
})
export class NavbarOngComponent implements OnInit {

  public selected = [
    false,
    false,
    false,
    false
  ];

  constructor(private route: Router, private auth: AuthService) {
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

    if (ruta == '/ong/inicio') {
      this.selected[0] = true;
    } else if (ruta == '/ong/mi-perfil') {
      this.selected[1] = true;
    } else if (ruta == '/ong/mis-iniciativas') {
      this.selected[2] = true;
    } else if (ruta == '/ong/administrar-voluntarios') {
      this.selected[3] = true;
    }
  }

  logout(){

    localStorage.clear();
    this.auth.logout();
  }

}
