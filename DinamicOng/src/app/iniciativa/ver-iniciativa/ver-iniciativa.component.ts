import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from '../services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ong } from '../../models/ong';
import { OngService } from '../../ong/services/ong.service';
import { Voluntario } from '../../models/voluntario';
import { Valoracion } from '../../models/valoracion';

@Component({
  selector: 'app-ver-iniciativa',
  templateUrl: './ver-iniciativa.component.html',
  styleUrls: ['./ver-iniciativa.component.css']
})
export class VerIniciativaComponent implements OnInit {

  public inicativa: Iniciativa;
  public puntaje: number;
  public id: string;
  public participantes: Array<Voluntario>;
  public imagenes: Array<string>;
  public creador: Ong;
  public valoracionNueva: Valoracion;

  public isOng: boolean;
  public creatorOng: boolean;
  public participante: boolean;
  public empezo: boolean;
  public comento: boolean;
  public solicito: boolean;

  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private ongService: OngService) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.valoracionNueva = new Valoracion();
    this.creador = new Ong();
    this.imagenes = [];
    this.participantes = [];
    this.creatorOng = false;
    this.solicito = false;
    this.comento = false;
    this.participante = false;
    this.empezo = false;
    this.inicativa = new Iniciativa();
    this.id = this.routeActive.snapshot.paramMap.get('id');
    this.obtenerIniciativa();

  }

  obtenerIniciativa() {
    this.iniciativaService.consultarIniciativaByID(this.id).then(resp => {

      this.inicativa = resp.data() as Iniciativa;
      this.obtenerParticipantes();
      this.calcularValoracion();
      const ruta = this.router.url;
      const str = String(ruta);

      if (str.includes('ong')) {

        this.isOng = true;
        const idOng = localStorage.getItem('uid');

        if (this.inicativa.idOng == idOng) {
          this.creatorOng = true;
        } else {

          this.ongService.consultarOngByID(this.inicativa.idOng).then(resp => {

            this.creador = resp.data() as Ong;
            this.ongService.obtenerImagenPerfil(this.creador.id).then(url =>{

              this.creador.imagenPerfil = url;

            });

          });

        }
      } else if (str.includes('voluntario')) {

        this.isOng = false;
        const idVol = localStorage.getItem('uid');

        this.ongService.consultarOngByID(this.inicativa.idOng).then(resp => {

          this.creador = resp.data() as Ong;
          this.ongService.obtenerImagenPerfil(this.creador.id).then(url =>{

            this.creador.imagenPerfil = url;

          });

        });

        if (this.inicativa.participantes.indexOf(idVol) != -1) {

          this.participante = true;
          this.yaComento(idVol);

        } else {

          this.iniciativaService.consultarSolicitud(idVol, this.inicativa.id).then(resp => {
            if (!resp.empty) {
              this.solicito = true;
            }
            //this.solicito = true;
          }, error => {
            console.log(error);
            this.solicito = false;
          });
        }

      } else {
        this.router.navigate(['']);
      }

      if (this.iniciativaService.compararFechaMenorIgualHoy(this.inicativa.fechaInicio)) {
        this.empezo = true;
      }

      this.imagenes = this.iniciativaService.obtenerImagenesIniciativa(this.inicativa.id);

    }, error => {
      console.log(error);
    });
  }

  calcularValoracion() {
    let res = 0;
    this.inicativa.valoraciones.forEach(v => {
      res += v.puntaje;
    });
    res /= this.inicativa.valoraciones.length;
    this.puntaje = res;
    res = res / 5 * 100;
    res = Math.round(res / 10) * 10;
    document.getElementById('estrella').style.width = '' + res + '%';
  }

  obtenerParticipantes() {
    this.participantes = this.iniciativaService.obtenerParticipantes(this.inicativa.participantes);
  }

  obtenerParticipanteById(id: string): Voluntario {
    let participante = new Voluntario();
    for (let p of this.participantes) {
      if (p.id == id) {
        participante = p;
        break;
      }
    }
    return participante;
  }

  comentar() {
      this.valoracionNueva.idValorador = localStorage.getItem('uid');
      this.inicativa.valoraciones.push(this.valoracionNueva);
      this.iniciativaService.updateIniciativa(this.inicativa);
      this.comento = true;
  }

  yaComento(idPart: string) {
    for (let val of this.inicativa.valoraciones) {
      if (val.idValorador == idPart) {
        this.comento = true;
        break;
      }
    }
  }

  solicitarUnirse() {
    //const idVol = "1Hq9g93bToOJxUEf66TGpQknQ4s1";
    const idVol = localStorage.getItem('uid');
    this.iniciativaService.solicitarUnirse(this.inicativa, idVol);
  }

}
