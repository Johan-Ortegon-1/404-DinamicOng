import { Component, OnInit } from '@angular/core';
import { AreasConocimiento } from '../../models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-iniciativa',
  templateUrl: './buscar-iniciativa.component.html',
  styleUrls: ['./buscar-iniciativa.component.css']
})
export class BuscarIniciativaComponent implements OnInit {
  public opcAreas = [];
  public areasConoc = AreasConocimiento;

  public opcidiomas = [];
  public idiomas = Idiomas;

  public iniciativaNueva: Iniciativa;
  public hoy: string;

  public areaNueva = '';
  public errorArea = '';

  public idiomaNuevo = '';
  public errorIdioma = '';

  public preview = [];

  constructor(private configC: NgbCarouselConfig) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.iniciativaNueva = new Iniciativa();
    this.hoy = this.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;

  }

  buscarIniciativa() {
    console.log(this.iniciativaNueva);
  }

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

  addAreaConoc() {

    if (this.iniciativaNueva.areasConocimientoRelacionadas.indexOf(this.areaNueva) == -1) {

      this.iniciativaNueva.areasConocimientoRelacionadas.push(this.areaNueva);
      this.areaNueva = AreasConocimiento.Ingenieria;
      this.errorArea = '';

    } else {
      this.errorArea = 'Ya se seleccionó este área';
    }
  }

  deleteAreaConoc(area: string) {
    const i = this.iniciativaNueva.areasConocimientoRelacionadas.indexOf( area );

    if ( i !== -1 ) {
      this.iniciativaNueva.areasConocimientoRelacionadas.splice( i, 1 );
    }
  }

  addIdioma() {

    if (this.iniciativaNueva.idiomasDeseables.indexOf(this.idiomaNuevo) == -1) {

      this.iniciativaNueva.idiomasDeseables.push(this.idiomaNuevo);
      this.idiomaNuevo = Idiomas.Espanol;
      this.errorIdioma = '';

    } else {
      this.errorIdioma = 'Ya se seleccionó este Idioma';
    }
  }

  deleteIdioma(idioma: string) {
    const i = this.iniciativaNueva.idiomasDeseables.indexOf( idioma );

    if ( i !== -1 ) {
      this.iniciativaNueva.idiomasDeseables.splice( i, 1 );
    }
  }
}
