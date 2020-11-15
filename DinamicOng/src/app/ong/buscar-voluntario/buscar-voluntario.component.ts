import { Voluntario } from './../../models/voluntario';
import { VoluntarioService } from './../../voluntario/services/voluntario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-voluntario',
  templateUrl: './buscar-voluntario.component.html',
  styleUrls: ['./buscar-voluntario.component.css']
})
export class BuscarVoluntarioComponent implements OnInit, OnDestroy {
  public voluntarioBuscar: Voluntario;
  public suscripcion = null;

  constructor(private voluntarioService: VoluntarioService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.suscripcion != null) {
      this.suscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.voluntarioBuscar = new Voluntario();
  }

  buscarVoluntario() {
    let voluntarios: Voluntario[] = [];
    this.suscripcion = this.voluntarioService.buscarVoluntario().subscribe((data:any) => {
      data.map(elem => {
        let voluntario: Voluntario = elem.payload.doc.data();
        if(voluntario.nombre.toUpperCase().indexOf(this.voluntarioBuscar.nombre.toUpperCase())!== -1) {
          voluntarios.push(voluntario);
          console.log("se encontro: " + voluntario.nombre);
        }
        else {
          console.log('no se encontro');
        }
      });

      if(voluntarios.length == 0) {
        alert('Sin resultados')
      }
      else {
        localStorage.setItem('voluntariosFiltrados', JSON.stringify(voluntarios));
        console.log(voluntarios);
        this.router.navigate(["/ong/mostrar-busqueda-voluntario"]);
      }
    });
  }

}
