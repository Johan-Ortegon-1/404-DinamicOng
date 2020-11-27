import { Component, OnInit, OnDestroy } from '@angular/core';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';
import { OngService } from '../services/ong.service';
import { Voluntario } from 'src/app/models/voluntario';
import { Ong } from 'src/app/models/ong';
import { Solicitud } from 'src/app/models/solicitud';
import { Iniciativa } from 'src/app/models/iniciativa';
import { AuxAdministrar } from 'src/app/models/auxAdministrar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.css']
})
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
      this.obtenerOngActual();
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if (this.sub != null) {
        this.sub.unsubscribe();
      }
    }

    // Metodo para obtener la ong del cual quiero saber sus notificaciones
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
    // Metodo para obtener las solucitudes de una Ong
    obtenerTodasSolicitudes() {
      let iniciativas: Iniciativa[] = [];
      this.sub = this.iniciativaService.consultarTodasSolicitudes().subscribe((data: any) => {
        data.map(elem => {
          this.auxiliares = [];
          const solicitud = elem.payload.doc.data();
          if (this.filtrarSolicitud(solicitud)) {
            this.solicitudes.push(solicitud);
            console.log('Solicitud agregada: ' + solicitud.id);
            this.obtenerVoluntario(solicitud);
          }
        });
      });
    }

    // Metodo para obtener al voluntario correspondiente a una solicitud
    // Parámetros:
    // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Voluntario
    obtenerVoluntario(solicitudActual: Solicitud) {
      this.voluntarioService.consultarVoluntarioByID(solicitudActual.idVoluntario).then(resp => {
        this.voluntario = resp.data() as Voluntario;
        console.log('Objeto Voluntario: ' + this.voluntario.correo);
        const nombre = this.voluntario.nombre;
        let urlImagen = '';
        this.voluntarioService.obtenerImagenPerfil(this.voluntario.id).then(url => {
          this.voluntario.imagenPerfil = url;
          urlImagen = url;
          this.obtenerIniciativa(solicitudActual, urlImagen, nombre);
        });
      });
    }

    // Metodo para obtener la iniciativa correspondiente a una solicitud
    // Parámetros:
    // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Voluntario
    // - urlImagen: Objeto que permite obtener la url de la imagen asociada
    obtenerIniciativa(solicitudActual: Solicitud, urlImagen: string, nombre: string) {
      this.iniciativaService.consultarIniciativaByID(solicitudActual.idIniciativa).then(resp => {
        this.iniciativa = resp.data() as Iniciativa;
        console.log('Objeto Iniciativa: ' + this.iniciativa.nombre);
        this.construirPresentacionDatos(solicitudActual, urlImagen, nombre);
      });
    }

    // Metodo para construir la presentacion de datos
    // Parámetros:
    // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente a un Voluntario
    // - urlImagen: Objeto que permite obtener la url de la imagen asociada
    construirPresentacionDatos(solicitudActual: Solicitud, urlImagen: string, nombre: string) {
      let nuevoAuxiliar: AuxAdministrar = new AuxAdministrar();

      nuevoAuxiliar.aceptado = solicitudActual.aceptado;
      nuevoAuxiliar.contestado = solicitudActual.contestado;
      nuevoAuxiliar.id = solicitudActual.id;
      nuevoAuxiliar.idIniciativa = solicitudActual.idIniciativa;
      nuevoAuxiliar.idVoluntario = solicitudActual.idVoluntario;
      nuevoAuxiliar.idOng = solicitudActual.idOng;

      nuevoAuxiliar.nombreVoluntaro = nombre;
      nuevoAuxiliar.nombreIniciativa = this.iniciativa.nombre;
      nuevoAuxiliar.nombreOng = this.ong.nombre;
      nuevoAuxiliar.rutaImagenOng = urlImagen;
      this.auxiliares.push(nuevoAuxiliar);
    }

    // Metodo para filtar las solicitudes por la Voluintario actual
    // Parámetros:
    // - Solicitud: Objeto que permite buscar en la bse de datos su correspondiente Voluintario
    filtrarSolicitud(solicituidActual: Solicitud): boolean {
      if (solicituidActual.idOng === this.ong.id) {
        return true;
      }
      return false;
    }

    // Metodo para cambiar de pagina y visualizar un Voluntario
    verVoluntario(aux: AuxAdministrar) {
      this.router.navigate(['/ong/ver-voluntario/' + aux.idVoluntario]);
    }
    // Metodo para cambiar de pagina y visualizar una iniciativa
    verIniciativa(aux: AuxAdministrar) {
      this.router.navigate(['/ong/iniciativa/' + aux.idIniciativa]);
    }

}
