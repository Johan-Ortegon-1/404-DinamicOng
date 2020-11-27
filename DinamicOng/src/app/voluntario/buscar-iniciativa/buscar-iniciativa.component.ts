import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreasConocimiento } from '../../models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar-iniciativa',
  templateUrl: './buscar-iniciativa.component.html',
  styleUrls: ['./buscar-iniciativa.component.css']
})
// Clase que representa el componente de buscar iniciativas desde el usuario voluntario
export class BuscarIniciativaComponent implements OnInit, OnDestroy {
  public opcAreas = [];
  public areasConoc = AreasConocimiento;

  public opcidiomas = [];
  public idiomas = Idiomas;

  public iniciativaBuscar: Iniciativa;
  public hoy: string;

  public areaNueva = '';
  public errorArea = '';

  public idiomaNuevo = '';
  public errorIdioma = '';
  public var = null;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - configC: Objeto que permite configurar el carousel de imagenes
  // - iniciativaService: Objeto que permite llamar las servicios relacionadas a la iniciativa
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private configC: NgbCarouselConfig, private iniciativaService: IniciativaService,  private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.iniciativaBuscar = new Iniciativa();
    this.hoy = this.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;

  }

  // Metodo que se ejecuta al eliminar el componente
  ngOnDestroy():void {
    if(this.var != null)
      this.var.unsubscribe();
  }

  // Metodo que se ejecuta para  buscar las inicitivas en base al formulario
  buscarIniciativa() {
    let iniciativas: Iniciativa[] = [];

    this.var = this.iniciativaService.buscarIniciativas().subscribe((data:any) => {
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
        localStorage.setItem('iniciativasFiltradas', JSON.stringify(iniciativas));
        this.router.navigate(["/voluntario/mostrar-iniciativa"]);
      }
    });
  }

  // Metodo que se ejecuta para verificar si una iniciativa cumple con filtro aplicado
  // Parametros:
  // - iniciativa: Objeto que contiene la informacion de la iniciativa
  // Return: boolean
  // retorna verdadero si la inciativa pasa el filtro
  // retorna falso si la iniciativa no pasa el filtro
  verificarFiltro(iniciativa: Iniciativa): boolean {
    let arrFiltro: boolean[] = [false, false, false, false, false];

    if(iniciativa.nombre.toUpperCase().indexOf(this.iniciativaBuscar.nombre.toUpperCase()) !== -1) {
      arrFiltro[0] = true;
    }
    else {
      arrFiltro[0] = false;
    }

    if(this.iniciativaBuscar.fechaInicio != null || this.iniciativaBuscar.fechaFinalizacion != null) {
      if(iniciativa.fechaInicio >= this.iniciativaBuscar.fechaInicio && iniciativa.fechaInicio <= this.iniciativaBuscar.fechaFinalizacion) {
        arrFiltro[1] = true;
      }
      else {
        arrFiltro[1] = false;
      }
    }
    else {
        arrFiltro[1] = true;
    }

    if(Object.entries(this.iniciativaBuscar.ubicacion).length !== 0) {
      if(
        iniciativa.ubicacion.ciudad.toUpperCase().indexOf(this.iniciativaBuscar.ubicacion.ciudad.toUpperCase()) !== -1 ||
        iniciativa.ubicacion.pais.toUpperCase().indexOf(this.iniciativaBuscar.ubicacion.pais.toUpperCase()) !== -1 ||
        iniciativa.ubicacion.direccion.toUpperCase().indexOf(this.iniciativaBuscar.ubicacion.direccion.toUpperCase()) !== -1
      ) {
        arrFiltro[2] = true;
      }
      else {
        arrFiltro[2] = false;
      }
    }
    else {
      arrFiltro[2] = true;
    }

    let sw = false;
    if(this.iniciativaBuscar.areasConocimientoRelacionadas.length != 0) {
      this.iniciativaBuscar.areasConocimientoRelacionadas.map(areaCBuscar => {
          iniciativa.areasConocimientoRelacionadas.map(areaC => {
              if(!sw) {
                if(areaC == areaCBuscar) {
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
    }
    else {
      arrFiltro[3] = true;
    }

    sw = false;
    if(this.iniciativaBuscar.idiomasDeseables.length != 0) {
      this.iniciativaBuscar.idiomasDeseables.map(idiomaBuscar => {
          iniciativa.idiomasDeseables.map(idioma => {
              if (!sw) {
                if(idioma == idiomaBuscar) {
                  arrFiltro[4] = true;
                  sw = true;
                }
                else {
                  arrFiltro[4] = false;
                }
              }
            }
          )
        }
      );
    }
    else {
      arrFiltro[4] =true;
    }

    sw = true;
    arrFiltro.map(elem => {
      console.log(elem);
      if(!elem && sw) {
        sw = false;
      }
    });

    return sw;
  }

  // Metodo que obtiene la fecha de hoy
  // Parámetros:
  // - formato: Número entre 1 y 2 que define el formato con el que se obtendrá la fecha
  // Retorno: Un string con la fecha de hoy
  obtenerFechaHoy(formato: number) {
    const dateOb = new Date();

    // adjust 0 before single digit date
    const date = ("0" + dateOb.getDate()).slice(-2);

    // current month
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

    // current year
    const year = dateOb.getFullYear();

    let result = null;

    if (formato == 1) {
      result = date + '/' + month + '/' + year;
    } else if (formato == 2) {
      result = year + '-' + month + '-' + date;
    }

    return result;

  }

  // Metodo para agregar un área de conocimiento a la lista de áreas de conocimiento de la iniciativa
  addAreaConoc() {

    if (this.iniciativaBuscar.areasConocimientoRelacionadas.indexOf(this.areaNueva) == -1) {

      this.iniciativaBuscar.areasConocimientoRelacionadas.push(this.areaNueva);
      this.areaNueva = AreasConocimiento.Ingenieria;
      this.errorArea = '';

    } else {
      this.errorArea = 'Ya se seleccionó este área';
    }
  }

  // Metodo para eliminar un área de conocimiento de la lista de áreas de conocimiento de la iniciativa
  deleteAreaConoc(area: string) {
    const i = this.iniciativaBuscar.areasConocimientoRelacionadas.indexOf( area );

    if ( i !== -1 ) {
      this.iniciativaBuscar.areasConocimientoRelacionadas.splice( i, 1 );
    }
  }

  // Metodo para agregar un idioma a la lista de idiomas de la iniciativa
  addIdioma() {

    if (this.iniciativaBuscar.idiomasDeseables.indexOf(this.idiomaNuevo) == -1) {

      this.iniciativaBuscar.idiomasDeseables.push(this.idiomaNuevo);
      this.idiomaNuevo = Idiomas.Espanol;
      this.errorIdioma = '';

    } else {
      this.errorIdioma = 'Ya se seleccionó este Idioma';
    }
  }

  // Metodo para eliminar un idioma de la lista de idiomas de la iniciativa
  deleteIdioma(idioma: string) {
    const i = this.iniciativaBuscar.idiomasDeseables.indexOf( idioma );

    if ( i !== -1 ) {
      this.iniciativaBuscar.idiomasDeseables.splice( i, 1 );
    }
  }
}
