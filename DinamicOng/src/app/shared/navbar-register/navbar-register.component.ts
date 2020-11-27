import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-register',
  templateUrl: './navbar-register.component.html',
  styleUrls: ['./navbar-register.component.css']
})

// Clase que representa el componente del navbar del register
export class NavbarRegisterComponent implements OnInit, OnDestroy {

  public tipo = ''; // String con el tipo de registro

  public sub: Subscription;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  constructor(private route: Router) {
    this.sub = route.events.subscribe(resp => {
      this.actualizarNavBar();
    });
  }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.actualizarNavBar();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub != null) {
      this.sub.unsubscribe();
    }

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
