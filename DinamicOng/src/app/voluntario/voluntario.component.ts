import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.component.html',
  styleUrls: ['./voluntario.component.css']
})

// Clase que representa el componente del modulo del Voluntario
export class VoluntarioComponent implements OnInit {

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    /*
    if (localStorage.getItem('uid') == null) {
      this.router.navigate(['']);
    } else if (localStorage.getItem('rol') == 'Ong') {
      this.router.navigate(['/ong']);
    }
    */
  }

}
