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
// Clase que representa el componente de mostras las inicitivas recomendadad al voluntario
export class RecomendacionesVoluntarioComponent implements OnInit {

  public iniciativas:Iniciativa[] = [];
  public voluntario: Voluntario;
  public uid: string;
  public var = null;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - configC: Objeto que permite configurar el carousel de imagenes
  // - voluntarioService: Objeto que permite llamar los servicios relacionados al voluntario
  // - ongService: Objeto que permite llamar los servicios relacionadas a la Ong
  // - iniciativaService: Objeto que permite llamar las servicios relacionadas a la iniciativa
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private configC: NgbCarouselConfig, private voluntarioServices: VoluntarioService, private ongService: OngService, private iniciativaService: IniciativaService, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.voluntario = new Voluntario();
    this.uid = localStorage.getItem('uid');
    this.voluntarioServices.consultarVoluntarioByID(this.uid).then(resp => {
      this.voluntario = resp.data() as Voluntario;
      this.buscarIniciativa();
    });
  }

  // Metodo que se ejecuta al eliminar el componente
  ngOnDestroy():void {
    if(this.var != null)
      this.var.unsubscribe();
  }

  // Metodo que se ejecuta para  buscar las inicitivas en base a los datos del voluntario
  buscarIniciativa() {
    this.var = this.iniciativaService.buscarIniciativas().subscribe((data:any) => {
      let iniciativas: Iniciativa[] = [];
      this.iniciativas = [];
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
        console.log(iniciativas);
        iniciativas.map(elem => {
          let ong = null;
          this.ongService.consultarOngByID(elem.idOng).then(resp => {
            ong = resp.data() as Ong;
            this.ongService.obtenerImagenPerfil(elem.idOng).then(url =>{
              ong.imagenPerfil = url;
              elem.imagenes = this.iniciativaService.obtenerImagenesIniciativa(elem.id);
              elem.imagenPerfil = ong.imagenPerfil;
              elem.nombreOng = ong.nombre;
              this.iniciativas.push(elem);
            });
          });
        });
      }
    });
  }

  // Metodo que se ejecuta para verificar si una iniciativa cumple con los datos del voluntario
  // Parametros:
  // - iniciativa: Objeto que contiene la informacion de la iniciativa
  // Return: boolean
  // retorna verdadero si la inciativa pasa el filtro
  // retorna falso si la iniciativa no pasa el filtro
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

  // Metodo que se ejecuta para navegar a la ong
  // Parametros:
  // - iniciativa: iniciativa que contiene el idOng, Ong que vamos a visualizar
  navVerOng(iniciativa: Iniciativa) {
    this.router.navigate(["/voluntario/ver-ong/" + iniciativa.idOng]);
  }

  // Metodo que se ejecuta para navegar a la iniciativa
  // Parametros:
  // - id: representa el id de iniciativa que vamos a visualizar
  navVerIni(id: string) {
    this.router.navigate(["/voluntario/iniciativa/" + id]);
  }
}
