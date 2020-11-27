
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Voluntario } from 'src/app/models/voluntario';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mostrar-busqueda-voluntario',
  templateUrl: './mostrar-busqueda-voluntario.component.html',
  styleUrls: ['./mostrar-busqueda-voluntario.component.css']
})
export class MostrarBusquedaVoluntarioComponent implements OnInit {
  public voluntarios: Voluntario[] = [];

  constructor(private configC: NgbCarouselConfig, private voluntarioService: VoluntarioService, private route: ActivatedRoute, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    //this.voluntarios = JSON.parse(localStorage.getItem('voluntariosFiltrados'));
    let voluntarios = JSON.parse(localStorage.getItem('voluntariosFiltrados'));
    //let voluntarios2: Voluntario[] = [];
    voluntarios.map( elem => {
      this.voluntarioService.obtenerImagenPerfil(elem.id).then(url => {
        elem.imagenPerfil = url;
        this.voluntarios.push(elem);
      });
    });
    //this.voluntarios = voluntarios2;
  }

  navVerVoluntario( voluntario: Voluntario) {
    this.router.navigate([ "/ong/ver-voluntario/" + voluntario.id]);
  }

}
