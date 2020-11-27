import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Ong } from 'src/app/models/ong';
import { Voluntario } from 'src/app/models/voluntario';
import { Iniciativa } from 'src/app/models/iniciativa';
import { AuxAdministrar } from 'src/app/models/auxAdministrar';
import { Solicitud } from 'src/app/models/solicitud';
import { OngService } from '../../ong/services/ong.service';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';


@Component({
  selector: 'app-navbar-ong',
  templateUrl: './navbar-ong.component.html',
  styleUrls: ['./navbar-ong.component.css']
})

// Clase que representa el componente del navbar de la Ong
export class NavbarOngComponent implements OnInit {

  public notificacion_pendiente = false;
  /**Version final */
  public ruta = this.route.url; // Objeto que que permitir[a la navegacion]
  public str = String(this.ruta); // Variable auxiliar para almacenar la ruta
  public ong = new Ong(); // Objeto que se llenará mediante el registro


  public selected = [ // Lista de banderas para identificar que enlace está seleccionado
    false,
    false,
    false,
    false
  ];

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - router: Objeto que permite navegar entre pantallas por la URL
  // - auth: Objeto que permite manejar datos de autenticación
  constructor(private route: Router, private auth: AuthService, private iniciativaService: IniciativaService,
              private ongService: OngService) {
    this.route.events.subscribe(val => {
      this.actualizarCambios();
    });
  }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.notificacion_pendiente = false;
    this.obtenerOngActual();
    this.actualizarCambios();
  }

  // Metodo que actualiza el arreglo de selección
  actualizarCambios() {
    this.selected = [
      false,
      false,
      false,
      false
    ];

    const ruta = this.route.url;

    if (ruta === '/ong/recomendaciones-ong') {
      this.selected[0] = true;
    } else if (ruta == '/ong/mi-perfil') {
      this.selected[1] = true;
    } else if (ruta == '/ong/mis-iniciativas') {
      this.selected[2] = true;
    } else if (ruta == '/ong/administrar-voluntarios') {
      this.selected[3] = true;
    }
  }

  // Metodo que realiza el logout del usuario
  logout() {

    localStorage.clear();
    this.auth.logout();
  }

  /*Proceso para activar alertas de notificacioens*/
  // Metodo para obtener el voluntario del cual quiero saber sus notificaciones
  obtenerOngActual() {
    if (this.str.includes('ong')) {
      const idOng = localStorage.getItem('uid');
      console.log('id de la ong Actual: ' + idOng);
      this.ongService.consultarOngByID(idOng).then(resp => {
        this.ong = resp.data() as Ong;
        console.log('Objeto Ong: ' + this.ong.correo);
        this.obtenerTodasSolicitudes();
      });
    }
  }

  // Metodo para obtener las solucitudes de un Voluntario
  obtenerTodasSolicitudes() {
    this.iniciativaService.consultarTodasSolicitudes().subscribe((data: any) => {
      data.map(elem => {
        const solicitud = elem.payload.doc.data();
        if (this.filtrarSolicitud(solicitud)) {
          this.notificacion_pendiente = true;
          return;
        }
      });
    });
  }

  // Metodo para filtar las solicitudes por el voluntario actual
  // Parámetros:
  // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Ong
  filtrarSolicitud(solicituidActual: Solicitud): boolean {
    if (solicituidActual.idOng === this.ong.id && solicituidActual.contestado === false) {
      return true;
    }
    return false;
  }

}
