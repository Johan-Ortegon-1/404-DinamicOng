import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-voluntario',
  templateUrl: './navbar-voluntario.component.html',
  styleUrls: ['./navbar-voluntario.component.css']
})

// Clase que representa el componente del navbar del voluntario
export class NavbarVoluntarioComponent implements OnInit, OnDestroy {

  public notificacion_pendiente = false;

  public selected = [ // Lista de banderas para identificar que enlace está seleccionado
    false,
    false,
    false,
    false
  ];

  public sub: Subscription;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  // - auth: Objeto que permite manejar datos de autenticación
  constructor(private route: Router,private auth: AuthService) {
    this.sub = this.route.events.subscribe(val => {
      this.actualizarCambios();
    });
  }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.actualizarCambios();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub != null) {
      this.sub.unsubscribe();
    }

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

    if (ruta == '/voluntario/recomendaciones-voluntario') {
      this.selected[0] = true;
    } else if (ruta == '/voluntario/mi-perfil') {
      this.selected[1] = true;
    } else if (ruta == '/voluntario/susripciones') {
      this.selected[2] = true;
    } else if (ruta == '/voluntario/participaciones') {
      this.selected[3] = true;
    }
  }



  // Metodo que realiza el logout del usuario
  logout() {
    localStorage.clear();
    this.auth.logout();
  }

}
