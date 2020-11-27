import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// Clase que representa el componente del Home
export class HomeComponent implements OnInit {

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  // Se valida si ya existe un usuario logueado
  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      const rol = localStorage.getItem('rol');
      if (rol == 'Ong') {
        this.router.navigate(['/ong']);
      } else if (rol == 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }
    }
  }

}
