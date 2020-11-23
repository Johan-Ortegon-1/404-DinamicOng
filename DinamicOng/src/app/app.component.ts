import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Clase que representa el componente del Modulo Global de la Aplicación
export class AppComponent {
  title = 'DinamicOng';

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) {}

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {

  }
}
