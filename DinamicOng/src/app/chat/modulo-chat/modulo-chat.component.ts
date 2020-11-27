import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modulo-chat',
  templateUrl: './modulo-chat.component.html',
  styleUrls: ['./modulo-chat.component.css']
})

// Clase que representa el componente del modulo del chat
export class ModuloChatComponent implements OnInit, OnDestroy {

  public select = false; // Bandera para identificar si se ha seleccionado una conversación

  public sub: Subscription;

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

    this.sub = this.router.events.subscribe(resp => {
      if ( this.router.url == '/voluntario/chat' || this.router.url == '/ong/chat') {
        this.select = false;
      } else {
        this.select = true;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

}
