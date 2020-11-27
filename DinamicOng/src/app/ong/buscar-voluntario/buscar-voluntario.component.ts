import { Conocimiento } from './../../models/conocimiento';
import { Voluntario } from './../../models/voluntario';
import { VoluntarioService } from './../../voluntario/services/voluntario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Idiomas } from 'src/app/models/enumIdiomas';

@Component({
  selector: 'app-buscar-voluntario',
  templateUrl: './buscar-voluntario.component.html',
  styleUrls: ['./buscar-voluntario.component.css']
})
// Clase que representa el componente de busqueda de voluntario
export class BuscarVoluntarioComponent implements OnInit, OnDestroy {
  public voluntarioBuscar: Voluntario; // clase donde se guardara informacion del formulario de busqueda para voluntario
  public suscripcion = null;

  public opcAreas = []; // Arreglo para guardar las areas que se mostraran a momento de la seleccion
  public areasConoc = AreasConocimiento; // Enumerados de areas de conocimiento

  public opcidiomas = []; // Arreglo para guardar los idiomas que se mostraran a momento de la seleccion
  public idiomas = Idiomas; // Enumerados de idiomas

  public areaNueva = ''; // Auxiliar se guarda el area seleccionada
  public errorArea = ''; // String para mostrar mensaje de error
  public conocimiento: Conocimiento; // auxiliar empleado para la seleeccion de areas

  public idiomaNuevo = ''; // Auxiliar se guarda el idioma seleccionado
  public errorIdioma = ''; // String para mostrar mensaje de error

  public minimoNacimiento: Date; // Almacena fecha para rango de busqueda
  public maximoNacimiento: Date; // Almacena fecha para rango de busqueda

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - voluntarioService: Objeto que permite el acceso al servicio de los voluntarios
  constructor(private voluntarioService: VoluntarioService, private router: Router) {}

  // Metodo que se ejecuta al cambiar y destruir el componente
  // Se eliminan las suscripciones activas
  ngOnDestroy(): void {
    if (this.suscripcion != null) {
      this.suscripcion.unsubscribe();
    }
  }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    this.voluntarioBuscar = new Voluntario();
    // this.hoy = this.obtenerFechaHoy(2);
    this.opcAreas = Object.keys(this.areasConoc);
    this.areaNueva = AreasConocimiento.Ingenieria;

    this.opcidiomas = Object.keys(this.idiomas);
    this.idiomaNuevo = Idiomas.Espanol;
  }

  // Metodo que se realiza la suscripcion a los voluntarios para realizar la busqueda
  buscarVoluntario() {

    this.suscripcion = this.voluntarioService.buscarVoluntario().subscribe((data:any) => {
      let voluntarios: Voluntario[] = [];
      data.map(elem => {
        let voluntario: Voluntario = elem.payload.doc.data();
        if(this.verificarFiltro(voluntario)) {
          voluntarios.push(voluntario);
          console.log(voluntario);
        }
        else {
          console.log('falle');
        }
      });

      if(voluntarios.length == 0) {
        alert('Sin resultados')
      }
      else {
        localStorage.setItem('voluntariosFiltrados', JSON.stringify(voluntarios));
        console.log(voluntarios);
        // redirige al componente de mostrar busqueda voluntario
        this.router.navigate(['/ong/mostrar-busqueda-voluntario']);
      }
    });
  }

// Metodo que realiza filtro de voluntarios de acuerdo a parametros ingresados por el usuario
// Parámetros:
// - voluntario: Objeto que reprecenta la informacion del voluntario que se va a filtrar
  verificarFiltro(voluntario: Voluntario): boolean {
    let arrFiltro: boolean[] = [false, false, false, false, false];

    // Primer filtro: nombre
    if(voluntario.nombre.toUpperCase().indexOf(this.voluntarioBuscar.nombre.toUpperCase()) !== -1) {
      arrFiltro[0] = true;
    }
    else {
      arrFiltro[0] = false;
    }

    // Segundo filtro: dedad por fechas de nacimiento
    if(this.minimoNacimiento != null) {
      if(this.minimoNacimiento >= voluntario.fechaNacimiento && this.maximoNacimiento <= voluntario.fechaNacimiento) {
        arrFiltro[1] = true;
      }
      else {
        arrFiltro[1] = false;
      }
    }
    else {
        arrFiltro[1] = true;
    }

     // Tercer filtro: ubicación
    if(Object.entries(this.voluntarioBuscar.ubicacion).length !== 0) {
      if(
        voluntario.ubicacion.ciudad.toUpperCase().indexOf(this.voluntarioBuscar.ubicacion.ciudad.toUpperCase()) !== -1 ||
        voluntario.ubicacion.pais.toUpperCase().indexOf(this.voluntarioBuscar.ubicacion.pais.toUpperCase()) !== -1 ||
        voluntario.ubicacion.direccion.toUpperCase().indexOf(this.voluntarioBuscar.ubicacion.direccion.toUpperCase()) !== -1
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

     // Tercer filtro: areas de conocimiento
    let sw = false;
    if(this.voluntarioBuscar.habilidades.length != 0) {
      this.voluntarioBuscar.habilidades.map(areaCBuscar => {
        voluntario.habilidades.map(areaC => {
              if(!sw) {
                if(areaC.area == areaCBuscar.area) {
                  arrFiltro[3] = true;
                  sw = true;
                } else {
                  arrFiltro[3] = false;
                }
              }
            }
          )
        }
      );
    } else {
      arrFiltro[3] = true;
    }

     // Cuarto filtro: idiomas
    sw = false;
    if(this.voluntarioBuscar.idiomas.length != 0) {
      this.voluntarioBuscar.idiomas.map(idiomaBuscar => {
        voluntario.idiomas.map(idioma => {
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
// Metodo que agrega areas para el filtro de voluntarios
  addAreaConoc() {

    this.conocimiento = new Conocimiento();
    let bandera = false;
    this.conocimiento.area = this.areaNueva;
    this.voluntarioBuscar.habilidades.forEach(conocim => {
      if (conocim.area == this.areaNueva) {
        bandera = true;
      }
    });

    if (bandera) {
      this.errorArea = 'Ya se seleccionó este área';
    } else {
      this.voluntarioBuscar.habilidades.push(this.conocimiento);
      this.areaNueva = AreasConocimiento.Ingenieria;
      this.errorArea = '';

    }

  }
// Metodo que elimina areas para el filtro de voluntarios
// Parámetros:
// - area: string que contiene el nombre del area a eliminar
  deleteAreaConoc(area: string) {
    let i = 0;
    this.voluntarioBuscar.habilidades.forEach(conocimiento => {
      if (conocimiento.area == area) {
        this.voluntarioBuscar.habilidades.splice(i, 1);
      }
      i++;
    });
  }
  // Metodo que agrega idiomas para el filtro de voluntarios
  addIdioma() {

    if (this.voluntarioBuscar.idiomas.indexOf(this.idiomaNuevo) == -1) {

      this.voluntarioBuscar.idiomas.push(this.idiomaNuevo);
      this.idiomaNuevo = Idiomas.Espanol;
      this.errorIdioma = '';

    } else {
      this.errorIdioma = 'Ya se seleccionó este Idioma';
    }
  }
// Metodo que elimina idiomas para el filtro de voluntarios
// Parámetros:
// - idioma: string que contiene el nombre del idioma a eliminar
  deleteIdioma(idioma: string) {
    const i = this.voluntarioBuscar.idiomas.indexOf( idioma );

    if ( i !== -1 ) {
      this.voluntarioBuscar.idiomas.splice( i, 1 );
    }
  }
}
