import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-register',
  templateUrl: './navbar-register.component.html',
  styleUrls: ['./navbar-register.component.css']
})

// Clase que representa el componente del navbar del register
export class NavbarRegisterComponent implements OnInit {

  public tipo = ''; // String con el tipo de registro

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  constructor(private route: Router) {
    route.events.subscribe(resp => {
      this.actualizarNavBar();
    });
  }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.actualizarNavBar();
  }

  // Metodo que actualiza el html dependiendo de la ruta
  actualizarNavBar() {
    const ruta = this.route.url;
    console.log(ruta);
    if(ruta == '/register/ong') {
      this.tipo = 'ONG';
    } else if (ruta == '/register/voluntario') {
      this.tipo = 'Voluntario';
    } else {
      this.tipo = '';
    }
  }

}
