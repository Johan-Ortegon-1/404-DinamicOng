import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversacion } from '../../models/conversacion';
import { ChatService } from '../services/chat.service';
import { VoluntarioService } from '../../voluntario/services/voluntario.service';
import { OngService } from '../../ong/services/ong.service';
import { Ong } from '../../models/ong';
import { Voluntario } from '../../models/voluntario';
import { Subscription } from 'rxjs';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

// Clase que representa el componente de chat de una conversación
export class ChatComponent implements OnInit, OnDestroy {

  public id: string; // Identificador de la conversación
  public conversacion: Conversacion; // Objeto que representa la conversación
  public mensaje: string; // Mensaje que ha sido ingresado en el input text
  public destinatario: Usuario; // Objeto que representa el usuario con el que se conversa y es destinatario
  public mensajesView = []; // Los mensajes que se van a mostrar en la vista del chat
  public suscripcionR: Subscription; // Suscripción a los cambios de la ruta
  public suscripcionC: Subscription; // Suscripción a los cambios en FireStore sobre la conversación en cuestion

  public imagenDefecto = 'https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg'; // URL de la imagen de perfil por defecto

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - actRoute: Objeto que permite obtener parametros de la URL
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - chatService: Objeto que permite el acceso al servicio de las conversaciones
  // - voluntarioService: Objeto que permite el acceso al servicio de los voluntarios
  // - ongService: Objeto que permite el acceso al servicio de las Ong's
  constructor(private actRoute: ActivatedRoute, private router: Router, private chatService: ChatService,
    private voluntarioService: VoluntarioService, private ongService: OngService) { }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas y se suscribe a las rutas
  ngOnInit(): void {
    this.destinatario = new Usuario();
    this.destinatario.imagenPerfil = this.imagenDefecto;
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.consultarConversacion();

    this.suscripcionR = this.router.events.subscribe((val) => {
      setTimeout(() => {
        this.destinatario = new Usuario();
        this.destinatario.imagenPerfil = this.imagenDefecto;
        this.suscripcionC.unsubscribe();
        this.mensaje = '';
        this.id = this.actRoute.snapshot.paramMap.get('id');
        this.consultarConversacion();
      },
      300);
    });
  }

  // Metodo que se ejecuta al cambiar y destruir el componente
  // Se eliminan las suscripciones activas
  ngOnDestroy(): void {
    this.suscripcionR.unsubscribe();
    this.suscripcionC.unsubscribe();
  }

  // Metodo que realiza la suscripción a la conversación de FireStore para consultar la conversación
  consultarConversacion() {
    this.suscripcionC = this.chatService.obtenerConversacionById(this.id).subscribe(resp => {
      this.conversacion = resp.payload.data() as Conversacion;
      this.consultarDestinatario();
      this.mostrarMensajes();
    });
  }

  // Metodo que llena la vista de mensajes e identifica cuales son los que el usuario ha escrito
  mostrarMensajes() {

    this.mensajesView = [];
    let id = localStorage.getItem('uid');
    this.conversacion.mensajes.forEach(m => {
      this.mensajesView.push({
        contenido: m.contenido,
        fecha: this.chatService.convertirFechaHora(new Date(m.fechaEnvio)),
        propio: m.idEmisor == id
      });
    });

    setTimeout(() => {
      if (document.getElementById('chatView')) {
        let element = document.getElementById('chatView');
        element.scrollTop = element.scrollHeight;
      }
    }, 100);

  }

  // Metodo que consulta la información del destinatario
  consultarDestinatario() {
    const rol = localStorage.getItem('rol');

    if (rol == 'Ong' && this.conversacion.idVoluntario != this.destinatario.id) {
      this.voluntarioService.consultarVoluntarioByID(this.conversacion.idVoluntario).then(resp => {
        this.destinatario = resp.data() as Voluntario;
        this.destinatario.imagenPerfil = this.imagenDefecto;
        this.voluntarioService.obtenerImagenPerfil(this.destinatario.id).then(resp2 => {
          this.destinatario.imagenPerfil = resp2;
        });
      });
    } else if (rol == 'Voluntario' && this.conversacion.idOng != this.destinatario.id) {
      this.ongService.consultarOngByID(this.conversacion.idOng).then(resp => {
        this.destinatario = resp.data() as Ong;
        this.destinatario.imagenPerfil = this.imagenDefecto;
        this.ongService.obtenerImagenPerfil(this.destinatario.id).then(resp2 => {
          this.destinatario.imagenPerfil = resp2;
        });
      });
    }
  }

  // Metodo que envía un nuevo mensaje al destinatario
  enviar() {
    if (this.mensaje != '' && this.mensaje != null) {
      let msg = new Mensaje();
      msg.contenido = this.mensaje;
      msg.idEmisor = localStorage.getItem('uid');
      msg.fechaEnvio = this.chatService.obtenerFechaHoraHoy(2);
      this.conversacion.mensajes.push(msg);
      this.chatService.actualizarConversacion(this.conversacion);
      this.mensaje = '';
    }
  }

  // Metodo que redirige al perfil de un voluntario u Ong segun el id
  redirigir(id: string) {
    const rol = localStorage.getItem('rol');
    if (rol == 'Ong') {
      this.router.navigate(['/ong/ver-voluntario/' + id]);
    } else if (rol == 'Voluntario') {
      this.router.navigate(['/voluntario/ver-ong/' + id]);
    }
  }

}
