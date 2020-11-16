import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  styleUrls: ['./ong.component.css']
})

// Clase que representa el componente del modulo de la Ong
export class OngComponent implements OnInit {

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // if (localStorage.getItem('uid') == null) {
    //   this.router.navigate(['']);
    // } else if (localStorage.getItem('rol') == 'Voluntario') {
    //   this.router.navigate(['/voluntario']);
    // }
  }

}
