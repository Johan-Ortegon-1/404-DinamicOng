import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

// Clase que representa el componente del Modulo de Registro
export class RegisterComponent implements OnInit {

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {

  }

}
