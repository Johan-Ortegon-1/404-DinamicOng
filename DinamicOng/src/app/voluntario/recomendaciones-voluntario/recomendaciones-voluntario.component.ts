import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { Ong } from '../../models/ong';
import { Iniciativa } from '../../models/iniciativa';
import { VoluntarioService } from '../services/voluntario.service';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { OngService } from './../../ong/services/ong.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-recomendaciones-voluntario',
  templateUrl: './recomendaciones-voluntario.component.html',
  styleUrls: ['./recomendaciones-voluntario.component.css']
})
export class RecomendacionesVoluntarioComponent implements OnInit {

  public iniciativas:Iniciativa[] = [];
  public voluntario: Voluntario;
  public uid: string;
  public var = null;

  constructor(private configC: NgbCarouselConfig, private voluntarioServices: VoluntarioService, private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.voluntario = new Voluntario();
    this.uid = localStorage.getItem('uid');
    this.voluntarioServices.consultarVoluntarioByID(this.uid).then(resp => {
      this.voluntario = resp.data() as Voluntario;
      this.buscarIniciativa();
    });
  }

  ngOnDestroy():void {
    if(this.var != null)
      this.var.unsubscribe();
  }

  buscarIniciativa() {
    let iniciativas: Iniciativa[] = [];

    this.var = this.iniciativaService.buscarIniciativa().subscribe((data:any) => {
      data.map(elem => {
        let iniciativa = elem.payload.doc.data();
        if(this.verificarFiltro(iniciativa)) {
          iniciativas.push(iniciativa);
          console.log(iniciativa);
        }
        else {
          console.log('falle');
        }
      });

      if(iniciativas.length == 0) {
        alert('Sin resultados')
      }
      else {
        this.iniciativas = iniciativas;
        let iniciativas2:Iniciativa[] = [];
        this.iniciativas.map(elem => {
          let ong = null;
          this.ongService.consultarOngByID(elem.idOng).then(resp => {
            ong = resp.data() as Ong;
            this.ongService.obtenerImagenPerfil(elem.idOng).then(url =>{
              ong.imagenPerfil = url;
              elem.imagenes = this.iniciativaService.obtenerImagenesIniciativa(elem.id);
              elem.imagenPerfil = ong.imagenPerfil;
              elem.nombreOng = ong.nombre;
              iniciativas2.push(elem);
            });
          });
        });
        this.iniciativas = iniciativas2;
        console.log(this.iniciativas);
      }
    });
  }

  verificarFiltro(iniciativa: Iniciativa): boolean {
    let arrFiltro: boolean[] = [false, false, false, false];

    let fechaHoy = new Date();
    let fechaVoluntario = new Date(iniciativa.fechaFinalizacion).getTime();
    console.log(fechaHoy);
    console.log(iniciativa.fechaFinalizacion);
    if(fechaHoy.getTime() <= fechaVoluntario) {
      arrFiltro[0] = true;

    }
    else {
      arrFiltro[0] = false;
    }

    if(
      iniciativa.ubicacion.ciudad.toUpperCase().indexOf(this.voluntario.ubicacion.ciudad.toUpperCase()) !== -1 ||
      iniciativa.ubicacion.pais.toUpperCase().indexOf(this.voluntario.ubicacion.pais.toUpperCase()) !== -1 ||
      iniciativa.ubicacion.direccion.toUpperCase().indexOf(this.voluntario.ubicacion.direccion.toUpperCase()) !== -1
    ) {
      arrFiltro[1] = true;
    }
    else {
      arrFiltro[1] = false;
    }

    let sw = false;
    this.voluntario.habilidades.map(habilidad => {
        iniciativa.areasConocimientoRelacionadas.map(areaC => {
            if(!sw) {
              if(areaC == habilidad.area) {
                arrFiltro[2] = true;
                sw = true;
              }
              else {
                arrFiltro[2] = false;
              }
            }
          }
        )
      }
    );

    sw = false;
    this.voluntario.idiomas.map(idiomaVoluntario => {
        iniciativa.idiomasDeseables.map(idioma => {
            if (!sw) {
              if(idioma == idiomaVoluntario) {
                arrFiltro[3] = true;
                sw = true;
              }
              else {
                arrFiltro[3] = false;
              }
            }
          }
        )
      }
    );

    sw = true;
    arrFiltro.map(elem => {
      console.log(elem);
      if(!elem && sw) {
        sw = false;
      }
    });

    return sw;
  }

  navVerOng(iniciativa: Iniciativa) {
    this.router.navigate(["/voluntario/ver-ong/" + iniciativa.idOng]);
  }

  navVerIni(id: string) {
    this.router.navigate(["/voluntario/iniciativa/" + id]);
  }
}
