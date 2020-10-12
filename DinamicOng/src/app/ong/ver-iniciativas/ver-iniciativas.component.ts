import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OngService } from '../services/ong.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ong } from 'src/app/models/ong';

@Component({
  selector: 'app-ver-iniciativas',
  templateUrl: './ver-iniciativas.component.html',
  styleUrls: ['./ver-iniciativas.component.css']
})
export class VerIniciativasComponent implements OnInit {

  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private ongService: OngService) { }

  public ruta = this.router.url;
  public str = String(this.ruta);
  public ongActual: Ong = new Ong();

  public iniciativas: Array<Iniciativa> = [];
  public imagenes: Array<string>;
  public imagenActual: string;
  public creadas = false;


  ngOnInit(): void {
    /**Obtencion de la Ong actual */
    this.imagenes = [];
    this.obtenerOngActual();
  }

  obtenerOngActual() {
    if (this.str.includes('ong')) {
      const idOng = localStorage.getItem('uid');
      console.log('id de la Ong Actual: ' + idOng);
      this.ongService.consultarOngByID(idOng).then(resp => {
        this.ongActual = resp.data() as Ong;
        console.log('Objeto Ong completo: ' + this.ongActual.correo);

        //llenado de las iniciativas
        for (let iter of this.ongActual.iniciativas) {
          this.llenarListaIniciativas(iter);
        }

        this.ongService.obtenerImagenPerfil(this.ongActual.id).then(url => {
          this.ongActual.imagenPerfil = url;
        });
      });
    }
  }

  llenarListaIniciativas(idiniciativa: string) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.iniciativas.push(nuevaIniciativa);
      this.imagenes = this.iniciativaService.obtenerImagenesIniciativa(nuevaIniciativa.id);
      this.imagenActual = this.imagenes[0];
    }, error => {
      console.log(error);
    });
  }
  // back() {
  //   this.router.navigate(['/conductor/inicio-conductor']);
  // }
}
