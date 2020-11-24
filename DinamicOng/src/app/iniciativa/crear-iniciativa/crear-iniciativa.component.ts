import { Component, OnInit } from '@angular/core';
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-iniciativa',
  templateUrl: './crear-iniciativa.component.html',
  styleUrls: ['./crear-iniciativa.component.css']
})

// Clase que representa el componente de crear-iniciativa
export class CrearIniciativaComponent implements OnInit {

  public opcAreas = []; // Lista para poder llenar el comboBox de las áreas de conocimiento
  public areasConoc = AreasConocimiento; // Objeto del enumerado de áreas de conocimiento

  public opcidiomas = []; // Lista para poder llenar el comboBox de los idiomas deseables
  public idiomas = Idiomas; // Objeto del enumerado de idiomas

  public iniciativaNueva: Iniciativa; // Objeto que representa la iniciativa a crear
  public hoy: string; // Un string que contendrá la fecha de hoy

  public areaNueva = ''; // Área de conocimiento nueva para registrar en las áreas de conocimiento de la iniciativa
  public errorArea = ''; // Mensaje de error a mostrarle al usuario sobre el área de conocimiento

  public idiomaNuevo = ''; // Idioma nuevo para registrar en los idiomas deseados de la iniciativa
  public errorIdioma = ''; // Mensaje de error a mostrarle al usuario sobre el idioma

  public preview = []; // Lista de URL's de las imagenes para su previsualización

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - iniciativaService: Objeto que permite el acceso al servicio de las iniciativas
  // - configC: Objeto que permite la configuración del carrusel de la previsualización de las imagenes
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private iniciativaService: IniciativaService, private configC: NgbCarouselConfig, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    this.iniciativaNueva = new Iniciativa();
    this.hoy = this.iniciativaService.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;

  }

  // Metodo que crea una iniciativa y redirige a la pantalla de las iniciativas de la Ong
  crearIniciativa() {
    this.iniciativaService.crearIniciativa(this.iniciativaNueva);
    this.router.navigate(['/ong/ver-iniciativas']);
  }

  // Metodo para guardar una imagen en la lista de imagenes de la iniciativa y en la previsualización
  // Parametros:
  // - $event: Evento resultante de un input file que contiene la imagen
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

  // Metodo para agregar un área de conocimiento a la lista de áreas de conocimiento de la iniciativa
  addAreaConoc() {

    if (this.iniciativaNueva.areasConocimientoRelacionadas.indexOf(this.areaNueva) == -1) {

      this.iniciativaNueva.areasConocimientoRelacionadas.push(this.areaNueva);
      this.areaNueva = AreasConocimiento.Ingenieria;
      this.errorArea = '';

    } else {
      this.errorArea = 'Ya se seleccionó este área';
    }
  }

  // Metodo para eliminar un área de conocimiento de la lista de áreas de conocimiento de la iniciativa
  deleteAreaConoc(area: string) {
    const i = this.iniciativaNueva.areasConocimientoRelacionadas.indexOf( area );

    if ( i !== -1 ) {
      this.iniciativaNueva.areasConocimientoRelacionadas.splice( i, 1 );
    }
  }

  // Metodo para agregar un idioma a la lista de idiomas de la iniciativa
  addIdioma() {

    if (this.iniciativaNueva.idiomasDeseables.indexOf(this.idiomaNuevo) == -1) {

      this.iniciativaNueva.idiomasDeseables.push(this.idiomaNuevo);
      this.idiomaNuevo = Idiomas.Espanol;
      this.errorIdioma = '';

    } else {
      this.errorIdioma = 'Ya se seleccionó este Idioma';
    }
  }

  // Metodo para eliminar un idioma de la lista de idiomas de la iniciativa
  deleteIdioma(idioma: string) {
    const i = this.iniciativaNueva.idiomasDeseables.indexOf( idioma );

    if ( i !== -1 ) {
      this.iniciativaNueva.idiomasDeseables.splice( i, 1 );
    }
  }

}
