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

// Clase que representa el componente de conversaciones
export class ConversacionesComponent implements OnInit, OnDestroy {

  public conversacionesView = []; // Las conversaciones que seran mostradas en la vista
  public conversacionesOriginal: Array<Conversacion>; // Las conversaciones que se recuperan de FireStore
  public conversacionesFiltradas = []; // Las conversaciones filtradas en las que el usuario participa
  public filtro = ''; // Filtro ingresado en la busqueda de conversaciones
  public suscripcion: Subscription; // Suscripción a las conversaciones de FireStore

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - chatService: Objeto que permite el acceso al servicio de las conversaciones
  // - voluntarioService: Objeto que permite el acceso al servicio de los voluntarios
  // - ongService: Objeto que permite el acceso al servicio de las Ong's
  constructor(private chatService: ChatService, private voluntarioService: VoluntarioService, private ongService: OngService,
    private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.obtenerConversaciones();
  }

  // Metodo que se ejecuta al cambiar y destruir el componente
  // Se eliminan las suscripciones activas
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  // Metodo que realiza la suscripción las conversaciones de FireStore para consultarlas
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

  // Metodo que ordena las conversaciones, según el tiempo del ultimo mensaje enviado
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

  // Metodo que filtra las conversaciones para manejar unicamente las del usuario,
  // además de llenar el arreglo de la vista mediante consultas de los usuarios destinatarios
  filtroInicio() {

    const id = localStorage.getItem('uid');
    const rol = localStorage.getItem('rol');

    this.conversacionesFiltradas = [];
    this.conversacionesView = [];
    let cont = 0;

    this.conversacionesOriginal.forEach(conversacion => {
      let i = cont;
      let aux;
      if (rol == 'Ong' && conversacion.idOng == id) {
        cont ++;
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
        cont ++;
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

  // Metodo que filtra las conversaciones según lo ingresado en el input de búsqueda
  filtrarConversaciones() {
    let result = [];

    this.conversacionesFiltradas.forEach(c => {
      if (c.nombre.toUpperCase().includes(this.filtro.toUpperCase())) {
        result.push(c);
      }
    });

    this.conversacionesView = result;
  }

  // Metodo que invoca el input de búsqueda para filtrar las conversaciones
  filtrar() {
    this.filtrarConversaciones();
  }

  // Metodo que redirige a la conversación según el id
  redirigir(id: string) {
    let rol = localStorage.getItem('rol');

    if (rol == 'Ong') {
      this.router.navigate(['/ong/chat/' + id]);
    } else if (rol == 'Voluntario') {
      this.router.navigate(['/voluntario/chat/' + id]);
    }

  }

}
