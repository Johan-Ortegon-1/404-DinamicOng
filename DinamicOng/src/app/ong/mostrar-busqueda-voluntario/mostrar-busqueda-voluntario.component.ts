
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
    this.voluntarios = JSON.parse(localStorage.getItem('voluntariosFiltrados'));
    let voluntarios2: Voluntario[] = [];
    this.voluntarios.map( elem => {
      voluntarios2.push(elem); });
    this.voluntarios = voluntarios2;
    console.log("estos son lo voluntarios")
    console.log(this.voluntarios);
  }

  navVerVoluntario( voluntario: Voluntario) {
    localStorage.setItem('id', voluntario.id);
    console.log("llego a ver vol");
    this.router.navigate([ "/ong/ver-voluntario"]);
  }

}
