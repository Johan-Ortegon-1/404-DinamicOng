import { Component, OnInit } from '@angular/core';
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';

@Component({
  selector: 'app-crear-iniciativa',
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.css']
})
export class CrearIniciativaComponent implements OnInit {

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

  constructor(private iniciativaService: IniciativaService, private configC: NgbCarouselConfig) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.iniciativaNueva = new Iniciativa();
    this.hoy = this.iniciativaService.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;

  }

  crearIniciativa() {
    this.iniciativaService.crearIniciativa(this.iniciativaNueva);
  }

  uploadImage($event) {

    if ($event.target.files && $event.target.files[0]) {

      this.iniciativaNueva.imagenes.push($event.target.files[0]);

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview.push(event.target.result);
      }

      reader.readAsDataURL($event.target.files[0]);
    }
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
