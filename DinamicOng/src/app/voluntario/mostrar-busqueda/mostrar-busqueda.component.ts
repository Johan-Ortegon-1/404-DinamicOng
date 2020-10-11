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
export class MostrarBusquedaComponent implements OnInit {
  public iniciativas:Iniciativa[] = [];

  constructor(private configC: NgbCarouselConfig, private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.iniciativas = JSON.parse(localStorage.getItem('iniciativasFiltradas'));
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

  navVerOng(iniciativa: Iniciativa) {
    localStorage.setItem('idOng', iniciativa.idOng);
    this.router.navigate(["/voluntario/ver-ong"]);
  }
}
