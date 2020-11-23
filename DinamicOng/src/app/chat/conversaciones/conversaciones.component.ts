import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OngService } from 'src/app/ong/services/ong.service';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';
import { ChatService } from '../services/chat.service';
import { Conversacion } from '../../models/conversacion';
import { Voluntario } from '../../models/voluntario';
import { Ong } from '../../models/ong';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
})
export class ConversacionesComponent implements OnInit, OnDestroy {

  public conversacionesView = [];
  public conversacionesOriginal: Array<Conversacion>;
  public conversacionesFiltradas = [];
  public filtro = '';
  public suscripcion: Subscription;

  constructor(private chatService: ChatService, private voluntarioService: VoluntarioService, private ongService: OngService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerConversaciones();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  obtenerConversaciones() {
    this.suscripcion = this.chatService.obtenerConversaciones().subscribe(cs => {
      this.conversacionesView = [];
      this.conversacionesOriginal = [];
      this.conversacionesFiltradas = [];
      cs.forEach(c => {
        const conversacion = c.payload.doc.data() as Conversacion;
        this.conversacionesOriginal.push(conversacion);
      });
      this.ordenarOriginal();
      this.filtroInicio();
    });
  }

  ordenarOriginal() {
    this.conversacionesOriginal.sort((a, b) => {
      let c = a.mensajes[a.mensajes.length - 1];
      let d = b.mensajes[b.mensajes.length - 1];
      if (c != null && d != null) {
        return new Date(d.fechaEnvio).getTime() - new Date(c.fechaEnvio).getTime();
      } else if (c == null) {
        return -1;
      } else if (d == null) {
        return 1;
      }
    });
  }

  filtroInicio() {

    const id = localStorage.getItem('uid');
    const rol = localStorage.getItem('rol');

    this.conversacionesFiltradas = [];
    this.conversacionesView = [];
    let cont = 0;

    this.conversacionesOriginal.forEach(conversacion => {
      let i = cont;
      cont ++;
      let aux;
      if (rol == 'Ong' && conversacion.idOng == id) {
        this.voluntarioService.consultarVoluntarioByID(conversacion.idVoluntario).then(resp => {
          const vol = resp.data() as Voluntario;
          this.voluntarioService.obtenerImagenPerfil(conversacion.idVoluntario).then(resp2 => {
            const ultMensaje = conversacion.mensajes[conversacion.mensajes.length - 1];
            let m = '';

            if(ultMensaje) {
              if (ultMensaje.idEmisor == id) {
                m = 'Tu: ' + ultMensaje.contenido;
              } else {
                m = ultMensaje.contenido;
              }
            }

            if (m.length > 32) {
              m = m.substr(0, 29) + '...';
            }

            aux = {
              id: conversacion.id,
              nombre: vol.nombre,
              imagen: resp2,
              mensaje: m,
              fecha: ultMensaje ? this.chatService.convertirFecha(new Date(ultMensaje.fechaEnvio)) : ''
            };
            this.conversacionesFiltradas[i] = aux;
          });
        });
      } else if (rol == 'Voluntario' && conversacion.idVoluntario == id) {
        this.ongService.consultarOngByID(conversacion.idOng).then(resp => {
          const ong = resp.data() as Ong;
          this.ongService.obtenerImagenPerfil(conversacion.idOng).then(resp2 => {
            const ultMensaje = conversacion.mensajes[conversacion.mensajes.length - 1];
            let m = '';
            if (ultMensaje) {
              if (ultMensaje.idEmisor == id) {
                m = 'Tu: ' + ultMensaje.contenido;
              } else {
                m = ultMensaje.contenido;
              }
            }
            if (m.length > 32) {
              m = m.substr(0, 29) + '...';
            }
            aux = {
              id: conversacion.id,
              nombre: ong.nombre,
              imagen: resp2,
              mensaje: m,
              fecha: ultMensaje ? this.chatService.convertirFecha(new Date(ultMensaje.fechaEnvio)) : ''
            };
            this.conversacionesFiltradas[i] = aux;

          });
        });
      }
    });
    setTimeout(() => {
      this.conversacionesView = this.conversacionesFiltradas;
    }, 800);
  }

  filtrarConversaciones() {
    let result = [];

    this.conversacionesFiltradas.forEach(c => {
      if (c.nombre.toUpperCase().includes(this.filtro.toUpperCase())) {
        result.push(c);
      }
    });

    this.conversacionesView = result;
  }

  filtrar() {
    this.filtrarConversaciones();
  }

  redirigir(id: string) {
    let rol = localStorage.getItem('rol');

    if (rol == 'Ong') {
      this.router.navigate(['/ong/chat/' + id]);
    } else if (rol == 'Voluntario') {
      this.router.navigate(['/voluntario/chat/' + id]);
    }

  }

}
