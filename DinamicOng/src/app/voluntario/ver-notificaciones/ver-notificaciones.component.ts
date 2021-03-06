import { Component, OnInit, OnDestroy } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { Ong } from '../../models/ong';
import { Solicitud } from '../../models/solicitud';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from 'src/app/ong/services/ong.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VoluntarioService } from '../services/voluntario.service';
import { AuxAdministrar } from '../../models/auxAdministrar';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.css']
})
// Clase que representa el componente ver notificaciones de un Voluntario
export class VerNotificacionesComponent implements OnInit, OnDestroy {

  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private voluntarioService: VoluntarioService, private ongService: OngService) { }

  public vol: Voluntario = new Voluntario();
  public ong1: Ong = new Ong(); // Objeto que se llenará mediante el registro
  public ong2: Ong = new Ong(); // Objeto que se llenará mediante el registro
  public solicitudes: Solicitud[] = []; // Secuecia para almacenar las solucitudes a desplegar

  /**Version final */
  public ruta = this.router.url; // Objeto que que permitir[a la navegacion]
  public str = String(this.ruta); // Variable auxiliar para almacenar la ruta
  public voluntario = new Voluntario(); // Objeto que se llenará mediante el registro
  public ong = new Ong(); // Objeto que se llenará mediante el registro
  public iniciativa = new Iniciativa(); // Objeto que se llenará mediante el registro
  public auxiliares: AuxAdministrar[] = []; // Secuecia para almacenar estructuras auxiliares

  public sub: Subscription;

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializa el objeto Ong
  ngOnInit(): void {
    this.obtenerVoluntarioActual();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }

  // Metodo para obtener el voluntario del cual quiero saber sus notificaciones
  obtenerVoluntarioActual() {
    if (this.str.includes('voluntario')) {
      const idVoluntario = localStorage.getItem('uid');
      //console.log('id del voluntario Actual: ' + idVoluntario);
      this.voluntarioService.consultarVoluntarioByID(idVoluntario).then(resp => {
        this.voluntario = resp.data() as Voluntario;
        //console.log('Objeto voluntario: ' + this.voluntario.correo);
        this.obtenerTodasSolicitudes();
      });
    }
  }
  // Metodo para obtener las solucitudes de un Voluntario
  obtenerTodasSolicitudes() {
    let iniciativas: Iniciativa[] = [];
    this.sub = this.iniciativaService.consultarTodasSolicitudes().subscribe((data: any) => {
      data.map(elem => {
        this.auxiliares = [];
        const solicitud = elem.payload.doc.data();
        if (this.filtrarSolicitud(solicitud)) {
          this.solicitudes.push(solicitud);
          //console.log('Solicitud agregada: ' + solicitud.id);
          this.obtenerOng(solicitud);
        }
      });
    });
  }

  // Metodo para obtener la ong correspondiente a una solicitud
  // Parámetros:
  // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Ong
  obtenerOng(solicitudActual: Solicitud) {
    this.ongService.consultarOngByID(solicitudActual.idOng).then(resp => {
      this.ong = resp.data() as Ong;
      console.log('Objeto Ong: ' + this.ong.nombre);
      const nombre = this.ong.nombre;
      let urlImagen = '';
      this.ongService.obtenerImagenPerfil(this.ong.id).then(url => {
        this.ong.imagenPerfil = url;
        urlImagen = url;
        this.obtenerIniciativa(solicitudActual, urlImagen, nombre);
      });
    });
  }

  // Metodo para obtener la iniciativa correspondiente a una solicitud
  // Parámetros:
  // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Ong
  // - urlImagen: Objeto que permite obtener la url de la imagen asociada
  obtenerIniciativa(solicitudActual: Solicitud, urlImagen: string, nombre: string) {
    this.iniciativaService.consultarIniciativaByID(solicitudActual.idIniciativa).then(resp => {
      this.iniciativa = resp.data() as Iniciativa;
      //console.log('Objeto Iniciativa: ' + this.iniciativa.nombre);
      this.construirPresentacionDatos(solicitudActual, urlImagen, nombre);
    });
  }

  // Metodo para construir la presentacion de datos
  // Parámetros:
  // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Ong
  // - urlImagen: Objeto que permite obtener la url de la imagen asociada
  construirPresentacionDatos(solicitudActual: Solicitud, urlImagen: string, nombre: string) {
    const nuevoAuxiliar: AuxAdministrar = new AuxAdministrar();
    nuevoAuxiliar.aceptado = solicitudActual.aceptado;
    nuevoAuxiliar.contestado = solicitudActual.contestado;
    nuevoAuxiliar.id = solicitudActual.id;
    nuevoAuxiliar.idIniciativa = solicitudActual.idIniciativa;
    nuevoAuxiliar.idVoluntario = solicitudActual.idVoluntario;
    nuevoAuxiliar.idOng = solicitudActual.idOng;

    nuevoAuxiliar.nombreVoluntaro = this.voluntario.nombre;
    nuevoAuxiliar.nombreIniciativa = this.iniciativa.nombre;
    nuevoAuxiliar.nombreOng = nombre;
    nuevoAuxiliar.rutaImagenOng = urlImagen;
    this.auxiliares.push(nuevoAuxiliar);
    //console.log("Nombre bandera:" + nombre);
  }

  // Metodo para filtar las solicitudes por el voluntario actual
  // Parámetros:
  // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Ong
  filtrarSolicitud(solicituidActual: Solicitud): boolean {
    if (solicituidActual.idVoluntario === this.voluntario.id) {
      return true;
    }
    return false;
  }

  // Metodo para cambiar de pagina y visualizar un Ong
  verOng(aux: AuxAdministrar) {
    this.router.navigate(['/voluntario/ver-ong/' + aux.idOng]);
  }
  // Metodo para cambiar de pagina y visualizar una iniciativa
  verIniciativa(aux: AuxAdministrar) {
    this.router.navigate(['/voluntario/iniciativa/' + aux.idIniciativa]);
  }
}
