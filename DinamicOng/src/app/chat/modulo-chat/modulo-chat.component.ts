import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo-chat',
  templateUrl: './modulo-chat.component.html',
  styleUrls: ['./modulo-chat.component.css']
})

// Clase que representa el componente del modulo del chat
export class ModuloChatComponent implements OnInit {

  public select = false; // Bandera para identificar si se ha seleccionado una conversación

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  // Se identifica si se ha seleccionado una conversación
  ngOnInit(): void {

    if ( this.router.url == '/voluntario/chat' || this.router.url == '/ong/chat') {
      this.select = false;
    } else {
      this.select = true;
    }

    this.router.events.subscribe(resp => {
      if ( this.router.url == '/voluntario/chat' || this.router.url == '/ong/chat') {
        this.select = false;
      } else {
        this.select = true;
      }
    });
  }

}
