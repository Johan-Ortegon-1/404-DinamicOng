import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { Voluntario } from 'src/app/models/voluntario';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';

@Component({
  selector: 'app-ver-voluntario',
  templateUrl: './ver-voluntario.component.html',
  styleUrls: ['./ver-voluntario.component.css']
})
export class VerVoluntarioComponent implements OnInit {

  public voluntario: Voluntario = new Voluntario();
  //public iniciativas: Iniciativa[]=[];
  public telefonoNuevo = '';
  public errorTelefonos = '';

  constructor(private voluntarioService: VoluntarioService, private iniciativaService: IniciativaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.voluntario.id = localStorage.getItem('id');
    this.obtenerVoluntarioActual();
  }

  obtenerVoluntarioActual() {
    this.voluntarioService.consultarVoluntarioByID(this.voluntario.id).then(resp => {
      this.voluntario = resp.data() as Voluntario;
      this.voluntarioService.obtenerImagenPerfil(this.voluntario.id).then(url => {
        this.voluntario.imagenPerfil = url;
      });
      console.log(this.voluntario);

      //llenado de las iniciativas
      /*let cont = 0;
      for (let iter of this.ong.iniciativas) {
        this.llenarListaIniciativas(iter, cont);
        cont = cont + 1;
      }
      this.ongService.obtenerImagenPerfil(this.ong.id).then(url => {
        this.ong.imagenPerfil = url;
      }); */
    });
  }

 /* llenarListaIniciativas(idiniciativa: string, cont: number) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.iniciativas.push(nuevaIniciativa);
      this.iniciativas[cont].imagenes = this.iniciativaService.obtenerImagenesIniciativa(nuevaIniciativa.id);

    }, error => {
      console.log(error);
    });
  } */
}
