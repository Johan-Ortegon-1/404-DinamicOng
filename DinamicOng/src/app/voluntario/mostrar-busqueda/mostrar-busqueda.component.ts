import { Component, OnInit } from '@angular/core';
import { AreasConocimiento } from '../../models/enumAreasConocimiento';
import { Iniciativa } from '../../models/iniciativa';
import { Ong } from '../../models/ong';
import { Idiomas } from '../../models/enumIdiomas';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { OngService } from './../../ong/services/ong.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mostrar-busqueda',
  templateUrl: './mostrar-busqueda.component.html',
  styleUrls: ['./mostrar-busqueda.component.css']
})
// Clase que representa el componente de mostrar la busqueda de las inicitivas desde el usuario voluntario
export class MostrarBusquedaComponent implements OnInit {
  public iniciativas:Iniciativa[] = [];

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - configC: Objeto que permite configurar el carousel de imagenes
  // - ongService: Objeto que permite llamar los servicios relacionadas a la Ong
  // - iniciativaService: Objeto que permite llamar las servicios relacionadas a la iniciativa
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private configC: NgbCarouselConfig, private ongService: OngService, private iniciativaService: IniciativaService, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {

    this.iniciativas = JSON.parse(localStorage.getItem('iniciativasFiltradas'));
    console.log('bandera' , this.iniciativas);
    let iniciativas2:Iniciativa[] = [];
    this.iniciativas.map(elem => {
      let ong = null;
      this.ongService.consultarOngByID(elem.idOng).then(resp => {
        ong = resp.data() as Ong;
        this.ongService.obtenerImagenPerfil(elem.idOng).then(url =>{
          ong.imagenPerfil = url;
          elem.imagenes = this.iniciativaService.obtenerImagenesIniciativa(elem.id);
          elem.imagenPerfil = ong.imagenPerfil;
          elem.nombreOng = ong.nombre;
          iniciativas2.push(elem);
        });
      });
    });
    this.iniciativas = iniciativas2;
    console.log(this.iniciativas);
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
