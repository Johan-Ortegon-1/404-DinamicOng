import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar-ong',
  templateUrl: './navbar-ong.component.html',
  styleUrls: ['./navbar-ong.component.css']
})

// Clase que representa el componente del navbar de la Ong
export class NavbarOngComponent implements OnInit {

  public selected = [ // Lista de banderas para identificar que enlace está seleccionado
    false,
    false,
    false,
    false
  ];

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  // - auth: Objeto que permite manejar datos de autenticación
  constructor(private route: Router, private auth: AuthService) {
    this.route.events.subscribe(val => {
      this.actualizarCambios();
    });
  }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.actualizarCambios();
  }

  // Metodo que actualiza el arreglo de selección
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

  // Metodo que realiza el logout del usuario
  logout() {

    localStorage.clear();
    this.auth.logout();
  }

}
