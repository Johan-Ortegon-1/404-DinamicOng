import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ong } from 'src/app/models/ong';
import { OngService } from 'src/app/ong/services/ong.service';
import { VoluntarioService } from '../services/voluntario.service';
import { Voluntario } from '../../models/voluntario';
import { Iniciativa } from 'src/app/models/iniciativa';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';

@Component({
  selector: 'app-ver-seguidos',
  templateUrl: './ver-seguidos.component.html',
  styleUrls: ['./ver-seguidos.component.css']
})
export class VerSeguidosComponent implements OnInit {

  public ongs: Array<Ong>;
  public iniciativas: Iniciativa[] = [];
  public seguidos: Array<string> = [];
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private ongService: OngService, private voluntarioService: VoluntarioService, private iniciativaService: IniciativaService) { }

  ngOnInit(): void {
    console.log('entro');
    this.iniciar();
  }

  iniciar() {
    let id = localStorage.getItem('uid');
    this.voluntarioService.consultarVoluntarioByID(id).then(resp => {
      const voluntario = resp.data() as Voluntario;
      voluntario.seguidos.forEach(item => {
        this.ongService.consultarOngByID(item).then( resp1 => {
          const ong = resp1.data() as Ong;
          ong.iniciativas.forEach(item2 => {
            this.iniciativaService.consultarIniciativaByID(item2).then(resp2 => {
              const ini = resp2.data() as Iniciativa;
              const aux = new Iniciativa();
              this.ongService.obtenerImagenPerfil(ong.id).then(url =>{
                ong.imagenPerfil = url;
                ini.imagenes = this.iniciativaService.obtenerImagenesIniciativa(ini.id);
                ini.imagenPerfil = ong.imagenPerfil;
                ini.nombreOng = ong.nombre;
                this.iniciativas.push(ini);
              });
            });
          });
        });
      });
    });
  }

  navVerOng(iniciativa: Iniciativa) {
    this.router.navigate(["/voluntario/ver-ong/" + iniciativa.idOng]);
  }

  navVerIni(id: string) {
    this.router.navigate(["/voluntario/iniciativa/" + id]);
  }
}
