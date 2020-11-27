import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { Ong } from 'src/app/models/ong';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Voluntario } from 'src/app/models/voluntario';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';
import { OngService } from '../services/ong.service';
import { Iniciativa } from 'src/app/models/iniciativa';

@Component({
  selector: 'app-recomendaciones-ong',
  templateUrl: './recomendaciones-ong.component.html',
  styleUrls: ['./recomendaciones-ong.component.css']
})
// Clase que representa el componente de recomendaciones para la ong
export class RecomendacionesOngComponent implements OnInit {

  public ong: Ong; // Objeto en el que se almacena la informacion de la ong actual
  public voluntarios: Voluntario[] = []; // Lista donde se guardaran los voluntarios filtrados
  public uid: string; // id de la ong actual
  public iniciativas: Array<Iniciativa> = []; // lista donde se guardaran las iniciativas de la ong actual
  public var = null;

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - obgService: Objeto que permite el acceso al servicio de las ongs
  // - iniciativaService: Objeto que permite el acceso al servicio de las iniciativas
  // - voluntarioService: Objeto que permite el acceso al servicio de los voluntarios
  constructor(private configC: NgbCarouselConfig, private iniciativaService: IniciativaService, private ongServices: OngService, private voluntarioService: VoluntarioService, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }
  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    this.ong = new Ong();
    this.uid = localStorage.getItem('uid');
    this.ongServices.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;
      // llenado de las iniciativas
      for (const iter of this.ong.iniciativas) {
        this.llenarListaIniciativas(iter);
      }
      // inicia busqueda
      this.buscarVoluntario();
    });

  }
  // Metodo que se ejecuta al cambiar y destruir el componente
  // Se eliminan las suscripciones activas
  ngOnDestroy(): void {
    if (this.var != null) {
      this.var.unsubscribe();
    }
  }
  // Metodo que se realiza la suscripcion a los voluntarios para realizar la busqueda
  buscarVoluntario() {

    this.var = this.voluntarioService.buscarVoluntario().subscribe((data: any) => {
      let voluntarios: Voluntario[] = [];
      this.voluntarios = [];
      data.map(elem => {
        let voluntario = elem.payload.doc.data();
        if (this.verificarFiltro(voluntario)) {
          voluntarios.push(voluntario);
          console.log(voluntario);
        }
        else {
          console.log('falle');
        }
      });

      if (voluntarios.length == 0) {
        alert('Sin resultados')
      }
      else {
        //this.voluntarios = voluntarios;
        //let voluntarios2: Voluntario[] = [];
        voluntarios.map(elem => {
          console.log(elem);
          this.voluntarioService.obtenerImagenPerfil(elem.id).then(url => {
            elem.imagenPerfil = url;
            this.voluntarios.push(elem);
          });
        });
        //this.voluntarios = voluntarios2;
        //console.log(this.voluntarios);
      }
    });
  }
  // Metodo para filtrar voluntarios
  // Parámetros:
  // - voluntario: Objeto que contiene el voluntario a filtrar
  verificarFiltro(voluntario: Voluntario): boolean {
    let arrFiltro: boolean[] = [false, false, false];
    // Primer filtro: Ubicacion
    if (
      voluntario.ubicacion.ciudad.toUpperCase().indexOf(this.ong.ubicacion.ciudad.toUpperCase()) !== -1 ||
      voluntario.ubicacion.pais.toUpperCase().indexOf(this.ong.ubicacion.pais.toUpperCase()) !== -1 ||
      voluntario.ubicacion.direccion.toUpperCase().indexOf(this.ong.ubicacion.direccion.toUpperCase()) !== -1
    ) {
      arrFiltro[0] = true;
    } else {
      arrFiltro[0] = false;
    }
    // Segundo filtro: areas de conocimimeto
    let sw = false;
    this.iniciativas.map(iniciativa => {
      iniciativa.areasConocimientoRelacionadas.map(area => {
        voluntario.habilidades.map(habilidad => {
          if (!sw) {
            if (habilidad.area == area) {
              arrFiltro[1] = true;
              sw = true;
            } else {
              arrFiltro[1] = false;
            }
          }
        });
      });
    });
    // Tercer filtro: idiomas
    sw = false;
    this.iniciativas.map(iniciativa => {
      iniciativa.idiomasDeseables.map(idioma => {
        voluntario.idiomas.map(idiomaV => {
          if (!sw) {
            if (idiomaV == idioma) {
              arrFiltro[2] = true;
              sw = true;
            } else {
              arrFiltro[2] = false;
            }
          }
        });
      });
    });

    sw = true;
    arrFiltro.map(elem => {
      console.log(elem);
      if (!elem && sw) {
        sw = false;
      }
    });

    return sw;
  }
  // Metodo constructor para obtener la informacion de las iniciativas de ong actual
  // Parámetros:
  // - idiniciativa: string que representa el identificador de la iniciativa
  llenarListaIniciativas(idiniciativa: string) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.iniciativas.push(nuevaIniciativa);
    }, error => {
      console.log(error);
    });
  }
  // Metoodo para dirigirse a el componente de ver voluntario
  navVerVol(id: string) {
    this.router.navigate(['/ong/ver-voluntario/' + id]);
  }
}

