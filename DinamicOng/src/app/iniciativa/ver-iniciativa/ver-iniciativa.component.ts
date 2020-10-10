import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from '../services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
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
  public id: string;
  public participantes: Array<Voluntario>; //Voluntario
  public imagenes: Array<string>;
  public creador: Ong;
  public valoracionNueva: Valoracion;

  public isOng: boolean;
  public creatorOng: boolean;
  public participante: boolean;
  public empezo: boolean;

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
              console.log(this.creador.imagenPerfil);
            });
          });
        }
      } else if (str.includes('voluntario')) {
        this.isOng = false;
        const idVol = localStorage.getItem('uid');
        if (this.inicativa.participantes.indexOf(idVol) != -1) {
          this.participante = true;
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
    //this.valoracionNueva.idValorador = localStorage.getItem('uid');
    this.valoracionNueva.idValorador = '1Hq9g93bToOJxUEf66TGpQknQ4s1';
    this.inicativa.valoraciones.push(this.valoracionNueva);
    this.iniciativaService.updateIniciativa(this.inicativa);
  }

}
