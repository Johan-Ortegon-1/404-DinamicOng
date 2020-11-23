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
export class ChatComponent implements OnInit, OnDestroy {

  public id: string;
  public conversacion: Conversacion;
  public mensaje: string;
  public destinatario: Usuario;
  public mensajesView = [];
  public suscripcionR: Subscription;
  public suscripcionC: Subscription;

  public imagenDefecto = 'https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg';

  constructor(private actRoute: ActivatedRoute, private router: Router, private chatService: ChatService,
    private voluntarioService: VoluntarioService, private ongService: OngService) { }

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

  ngOnDestroy(): void {
    this.suscripcionR.unsubscribe();
    this.suscripcionC.unsubscribe();
  }

  consultarConversacion() {
    this.suscripcionC = this.chatService.obtenerConversacionById(this.id).subscribe(resp => {
      this.conversacion = resp.payload.data() as Conversacion;
      this.consultarDestinatario();
      this.mostrarMensajes();
    });
  }

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

    if (document.getElementById('chatView')) {
      let element = document.getElementById('chatView');
      element.scrollTop = element.scrollHeight;
    }

  }

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

  redirigir(id: string) {
    const rol = localStorage.getItem('rol');
    if (rol == 'Ong') {
      this.router.navigate(['/ong/ver-voluntario/' + id]);
    } else if (rol == 'Voluntario') {
      this.router.navigate(['/voluntario/ver-ong/' + id]);
    }
  }

}
