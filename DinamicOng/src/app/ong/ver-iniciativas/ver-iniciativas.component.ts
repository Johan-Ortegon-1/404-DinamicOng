import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../services/ong.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ong } from 'src/app/models/ong';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-iniciativas',
  templateUrl: './ver-iniciativas.component.html',
  styleUrls: ['./ver-iniciativas.component.css']
})
// Clase que representa el componente de ver iniciativas por parte de una Ong
export class VerIniciativasComponent implements OnInit {

  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private ongService: OngService) { }

  public ruta = this.router.url;//Objeto donde se almacena la url de la sesión actual
  public str = String(this.ruta);//Conversión a String de la url
  public ongActual: Ong = new Ong(); // Objeto en donde se almacenará la Ong que quiere ver la lista de iniciativas

  public iniciativas: Array<Iniciativa> = [];// Arreglo para almacenar las iniciativas de la Ong
  public imagenes: Array<string>;// Arreglo para almacenar las url imágenes de la iniciativa
  public imagenActual: string;// String que almacena url de la primera imagen de la iniciativa
  public creadas = false;

  // Metodo que se ejecuta al iniciar el componente
  // Se obtiene la Ong actual 
  ngOnInit(): void {
    this.imagenes = [];
    this.obtenerOngActual();
  }
  // Metodo para obtener la Ong que quiere ver su lista de iniciativas
  obtenerOngActual() {
    if (this.str.includes('ong')) {
      const idOng = localStorage.getItem('uid');
      console.log('id de la Ong Actual: ' + idOng);
      this.ongService.consultarOngByID(idOng).then(resp => {
        this.ongActual = resp.data() as Ong;
        console.log('Objeto Ong completo: ' + this.ongActual.correo);

        // En este ciclo se hace el llamado al método de llenado de la lista de iniciativas
        for (const iter of this.ongActual.iniciativas) {
          this.llenarListaIniciativas(iter);

        }

        this.ongService.obtenerImagenPerfil(this.ongActual.id).then(url => {
          this.ongActual.imagenPerfil = url;
        });
      });
    }
  }
  // Metodo para llenar la lista de iniciativas
  // Parámetros:
  // - idiniciativa: String que identifica a una iniciativa

  llenarListaIniciativas(idiniciativa: string) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.imagenes = this.iniciativaService.obtenerImagenesIniciativa(nuevaIniciativa.id);
      nuevaIniciativa.imagenes = this.imagenes;
      this.iniciativas.push(nuevaIniciativa);

      this.imagenActual = this.imagenes[0];
    }, error => {
      console.log(error);
    });
  }
  // back() {
  //   this.router.navigate(['/conductor/inicio-conductor']);
  // }


  // Metodo para ver la información de la iniciativa seleccionada
  // Parámetros:
  // - iniciativaSeleccionada: Objeto que identifica a una Iniciativa
  verIniciativa(iniciativaSeleccionada: Iniciativa) {
    this.router.navigate(['/ong/iniciativa/' + iniciativaSeleccionada.id]);
  }
// Metodo para ver la página de creación de iniciativas
  verCrearIniciativa() {
    this.router.navigate(['/ong/crear-iniciativa']);
  }
}
