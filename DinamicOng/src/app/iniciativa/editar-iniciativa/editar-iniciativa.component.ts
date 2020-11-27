import { Component, OnInit } from '@angular/core';
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Voluntario } from 'src/app/models/voluntario';
import { Ong } from 'src/app/models/ong';
import { Valoracion } from 'src/app/models/valoracion';
import { OngService } from '../../ong/services/ong.service';

@Component({
  selector: 'app-editar-iniciativa',
  templateUrl: './editar-iniciativa.component.html',
  styleUrls: ['./editar-iniciativa.component.css']
})

// Clase que representa el componente de crear-iniciativa
export class EditarIniciativaComponent implements OnInit {

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




  public iniciativa: Iniciativa; // Objeto de la iniciativa a mostrar
  public puntaje: number; // Puntaje promedio de la iniciativa
  public id: string; // Identificador de la iniciativa
  public participantes: Array<Voluntario>; // Lista de objetos Voluntario que representa los participantes de la iniciativa
  public imagenes: Array<string>; // Lista de las URL's de las imagenes de la iniciativa
  public creador: Ong; // Objeto de la Ong creadora
  public valoracionNueva: Valoracion; // Objeto Valoracion que identifica la nueva valoración que podría dar un voluntario

  public isOng: boolean; // Bandera que indica si el usuario que ingresó es una Ong
  public creatorOng: boolean; // Bandera que indica si el usuario que ingresó es la Ong Creadora
  public participante: boolean; // Bandera que indica si el usuario que ingresó es un voluntario inscrito
  public empezo: boolean; // Bandera que indica si la iniciativa ya empezó
  public comento: boolean; // Bandera que indica si el voluntario inscrito ya comentó la iniciativa
  public solicito: boolean; // Bandera que indica si el voluntario no inscrito ya solicitó unirse a la iniciativa
  public hayCupos: boolean; // Bandera que indica si hay cupos disponibles en la iniciativa


  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - iniciativaService: Objeto que permite el acceso al servicio de las iniciativas
  // - configC: Objeto que permite la configuración del carrusel de la previsualización de las imagenes
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private iniciativaService: IniciativaService,private ongService: OngService, private routeActive: ActivatedRoute, private configC: NgbCarouselConfig, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    this.iniciativaNueva = new Iniciativa();
    this.iniciativaNueva.nombre ="";
    this.iniciativaNueva.descripcion ="";
    this.iniciativaNueva.ubicacion.ciudad ="";
    this.iniciativaNueva.ubicacion.pais ="";
    this.iniciativaNueva.ubicacion.direccion ="";
    
    this.hoy = this.iniciativaService.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;

    this.valoracionNueva = new Valoracion();
    this.creador = new Ong();
    this.imagenes = [];
    this.participantes = [];
    this.creatorOng = false;
    this.hayCupos = true;
    this.solicito = false;
    this.comento = false;
    this.participante = false;
    this.empezo = false;
    this.iniciativa = new Iniciativa();
    this.id = this.routeActive.snapshot.paramMap.get('id');
    this.obtenerIniciativa();
   

  }

  // Metodo que editar una iniciativa y redirige a la pantalla de las iniciativas de la Ong
  editarIniciativa() {
      this.iniciativaNueva.id= this.iniciativa.id;
      this.iniciativaNueva.idOng= this.iniciativa.idOng;
      this.iniciativaNueva.imagenPerfil= this.iniciativa.imagenPerfil;
      this.iniciativaNueva.valoraciones= this.iniciativa.valoraciones;
      this.iniciativaNueva.solicitudes = this.iniciativa.solicitudes; 
      this.iniciativaNueva.participantes= this.iniciativa.participantes;

      if(this.iniciativaNueva.nombre == "")
      {
        this.iniciativaNueva.nombre = this.iniciativa.nombre;
      }
      if(this.iniciativaNueva.descripcion == "")
      {
        this.iniciativaNueva.descripcion = this.iniciativa.descripcion;
      }
      if(this.iniciativaNueva.fechaInicio == null)
      {
        this.iniciativaNueva.fechaInicio = this.iniciativa.fechaInicio;
      }
      if(this.iniciativaNueva.fechaFinalizacion == null)
      {
        this.iniciativaNueva.fechaFinalizacion = this.iniciativa.fechaFinalizacion;
      }
      if(this.iniciativaNueva.areasConocimientoRelacionadas.length == 0)
      {
        this.iniciativaNueva.areasConocimientoRelacionadas.length = this.iniciativa.areasConocimientoRelacionadas.length;
      }
      if(this.iniciativaNueva.idiomasDeseables.length == 0)
      {
        this.iniciativaNueva.idiomasDeseables.length = this.iniciativa.idiomasDeseables.length;
      }
      if(this.iniciativaNueva.ubicacion.pais == "")
      {
        this.iniciativaNueva.ubicacion.pais = this.iniciativa.ubicacion.pais;
      }
      if(this.iniciativaNueva.ubicacion.ciudad == "")
      {
        this.iniciativaNueva.ubicacion.ciudad = this.iniciativa.ubicacion.ciudad;
      }
      if(this.iniciativaNueva.ubicacion.direccion == "")
      {
        this.iniciativaNueva.ubicacion.direccion = this.iniciativa.ubicacion.direccion;
      }
    this.iniciativaService.updateIniciativa2(this.iniciativaNueva, this.imagenes.length);
    this.router.navigate(['/ong/iniciativa/' + this.iniciativa.id]);
  }
  // Metodo que obtiene el objeto de la iniciativa y realiza la lógica de identificación de usuario (banderas)
  obtenerIniciativa() {
    this.iniciativaService.consultarIniciativaByID(this.id).then(resp => {

      this.iniciativa = resp.data() as Iniciativa;
      const ruta = this.router.url;
      const str = String(ruta);
      for (let p of this.iniciativa.areasConocimientoRelacionadas){
        this.iniciativaNueva.areasConocimientoRelacionadas.push(p);
      }
      for (let p of this.iniciativa.idiomasDeseables){
        this.iniciativaNueva.idiomasDeseables.push(p);
      }
      this.imagenes = this.iniciativaService.obtenerImagenesIniciativa(this.iniciativa.id);
      
      if (this.iniciativaService.compararFechaMenorIgualHoy(this.iniciativa.fechaInicio)) {
        this.empezo = true;
      }
    }, error => {
      console.log(error);
    });
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
  volver()
  {
    this.router.navigate(['/ong/iniciativa/' + this.iniciativa.id]);
  }

}
