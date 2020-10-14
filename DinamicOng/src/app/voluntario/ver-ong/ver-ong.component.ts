import { Component, OnInit } from '@angular/core';
import { OngService } from './../../ong/services/ong.service';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { Ong } from './../../models/ong';
import { Iniciativa } from './../../models/iniciativa';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-ong',
  templateUrl: './ver-ong.component.html',
  styleUrls: ['./ver-ong.component.css']
})
export class VerOngComponent implements OnInit {

  public ong:Ong = new Ong();
  public iniciativas: Iniciativa[]=[];
  public telefonoNuevo = '';
  public errorTelefonos = '';

  constructor(private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ong.id = this.route.snapshot.paramMap.get('id');
    this.obtenerOngActual();
  }

  obtenerOngActual() {
    this.ongService.consultarOngByID(this.ong.id).then(resp => {
      this.ong= resp.data() as Ong;
      console.log(this.ong);

      //llenado de las iniciativas
      let cont = 0;
      for (let iter of this.ong.iniciativas) {
        this.llenarListaIniciativas(iter, cont);
        cont = cont + 1;
      }
      this.ongService.obtenerImagenPerfil(this.ong.id).then(url => {
        this.ong.imagenPerfil = url;
      });
    });
  }

  llenarListaIniciativas(idiniciativa: string, cont: number) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.iniciativas.push(nuevaIniciativa);
      this.iniciativas[cont].imagenes = this.iniciativaService.obtenerImagenesIniciativa(nuevaIniciativa.id);

    }, error => {
      console.log(error);
    });
  }
}
