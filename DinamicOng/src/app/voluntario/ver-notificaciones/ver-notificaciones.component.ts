import { Component, OnInit } from '@angular/core';
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



@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.css']
})
export class VerNotificacionesComponent implements OnInit {

  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private voluntarioService: VoluntarioService, private ongService: OngService) { }

  public vol: Voluntario = new Voluntario();
  public ong1: Ong = new Ong();
  public ong2: Ong = new Ong();
  public solicitudes: Solicitud[] = [];

  /**Version final */
  public ruta = this.router.url;
  public str = String(this.ruta);
  public voluntario = new Voluntario();
  public ong = new Ong();
  public iniciativa = new Iniciativa();
  public auxiliares: AuxAdministrar[] = [];

  ngOnInit(): void {
    this.obtenerVoluntarioActual();
  }
  obtenerVoluntarioActual() {
    if (this.str.includes('voluntario')) {
      const idVoluntario = localStorage.getItem('uid');
      console.log('id del voluntario Actual: ' + idVoluntario);
      this.voluntarioService.consultarVoluntarioByID(idVoluntario).then(resp => {
        this.voluntario = resp.data() as Voluntario;
        console.log('Objeto voluntario: ' + this.voluntario.correo);
        this.obtenerTodasSolicitudes();
      });
    }
  }
  obtenerTodasSolicitudes() {
    let iniciativas: Iniciativa[] = [];
    this.iniciativaService.consultarTodasSolicitudes().subscribe((data: any) => {
      data.map(elem => {
        this.auxiliares = [];
        const solicitud = elem.payload.doc.data();
        if (this.filtrarSolicitud(solicitud)) {
          this.solicitudes.push(solicitud);
          console.log('Solicitud agregada: ' + solicitud.id);
          this.obtenerOng(solicitud);
        }
      });
    });
  }
  obtenerOng(solicitudActual: Solicitud) {
    this.ongService.consultarOngByID(solicitudActual.idOng).then(resp => {
      this.ong = resp.data() as Ong;
      console.log('Objeto Ong: ' + this.ong.correo);
      let urlImagen = '';
      this.ongService.obtenerImagenPerfil(this.ong.id).then(url => {
        this.ong.imagenPerfil = url;
        urlImagen = url;
        this.obtenerIniciativa(solicitudActual, urlImagen);
      });
    });
  }
  obtenerIniciativa(solicitudActual: Solicitud, urlImagen: string) {
    this.iniciativaService.consultarIniciativaByID(solicitudActual.idIniciativa).then(resp => {
      this.iniciativa = resp.data() as Iniciativa;
      console.log('Objeto Iniciativa: ' + this.iniciativa.nombre);
      this.construirPresentacionDatos(solicitudActual, urlImagen);
    });
  }
  construirPresentacionDatos(solicitudActual: Solicitud, urlImagen: string) {
    let nuevoAuxiliar: AuxAdministrar = new AuxAdministrar();

    nuevoAuxiliar.aceptado = solicitudActual.aceptado;
    nuevoAuxiliar.contestado = solicitudActual.contestado;
    nuevoAuxiliar.id = solicitudActual.id;
    nuevoAuxiliar.idIniciativa = solicitudActual.idIniciativa;
    nuevoAuxiliar.idVoluntario = solicitudActual.idVoluntario;
    nuevoAuxiliar.idOng = solicitudActual.idOng;

    nuevoAuxiliar.nombreVoluntaro = this.voluntario.nombre;
    nuevoAuxiliar.nombreIniciativa = this.iniciativa.nombre;
    nuevoAuxiliar.nombreOng = this.ong.nombre;
    nuevoAuxiliar.rutaImagenOng = urlImagen;
    this.auxiliares.push(nuevoAuxiliar);
  }
  filtrarSolicitud(solicituidActual: Solicitud): boolean {
    if (solicituidActual.idVoluntario === this.voluntario.id) {
      return true;
    }
    return false;
  }
  verOng(aux: AuxAdministrar) {
    this.router.navigate(['/voluntario/ver-ong/' + aux.idOng]);
  }
  verIniciativa(aux: AuxAdministrar) {
    this.router.navigate(['/voluntario/iniciativa/' + aux.idIniciativa]);
  }
}
