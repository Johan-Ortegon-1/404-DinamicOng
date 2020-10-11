import { Component, OnInit } from '@angular/core';
import { Iniciativa } from 'src/app/models/iniciativa';
import { Ong } from 'src/app/models/ong';
import { VoluntarioService } from '../services/voluntario.service';
import { OngService } from '../../ong/services/ong.service';
import { Router } from '@angular/router';
import { Voluntario } from 'src/app/models/voluntario';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';

@Component({
  selector: 'app-mis-participaciones',
  templateUrl: './mis-participaciones.component.html',
  styleUrls: ['./mis-participaciones.component.css']
})
export class MisParticipacionesComponent implements OnInit {

  public participaciones = [];

  constructor(private voluntarioService: VoluntarioService, private ongService: OngService,
    private router: Router, private iniciativaService: IniciativaService) { }

  ngOnInit(): void {
    const idVol = localStorage.getItem('uid');
    //const idVol = '1Hq9g93bToOJxUEf66TGpQknQ4s1';
    this.participaciones = this.obtenerParticipaciones(idVol);
    console.log(this.participaciones);
  }

  redirigir(tipo: number, id: string) {
    if (tipo == 1) {
      //Ver ONG
    } else if (tipo == 2) {
      this.router.navigate(['/voluntario/iniciativa/' + id]);
    }
  }

  obtenerParticipaciones(id: string) {
    let iniciativas = [];
    this.voluntarioService.consultarVoluntarioByID(id).then(resp => {
      let vol = resp.data() as Voluntario;
      console.log(vol);
      vol.participaciones.forEach(inicId => {
        this.iniciativaService.consultarIniciativaByID(inicId).then(resp2 => {
          let inic = resp2.data() as Iniciativa;
          let ong: Ong;

          this.ongService.consultarOngByID(inic.idOng).then(res => {
            ong = res.data() as Ong;
            this.ongService.obtenerImagenPerfil(inic.idOng).then(resp => {
              ong.imagenPerfil = resp;
              iniciativas.push({iniciativa: inic, creador: ong});
            });
          });

        });
      });
    });
    return iniciativas;
  }

}
