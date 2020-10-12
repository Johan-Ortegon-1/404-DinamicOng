import { Component, OnInit } from '@angular/core';
import { Ong } from '../../models/ong';
import { Iniciativa } from '../../models/iniciativa';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';
import { OngService } from '../services/ong.service';
import { Solicitud } from '../../models/solicitud';
import { VoluntarioService } from '../../voluntario/services/voluntario.service';
import { Voluntario } from '../../models/voluntario';
import { auxAdministrar } from 'src/app/models/auxAdministrar';

@Component({
  selector: 'app-administrar-voluntarios',
  templateUrl: './administrar-voluntarios.component.html',
  styleUrls: ['./administrar-voluntarios.component.css']
})
export class AdministrarVoluntariosComponent implements OnInit {

  constructor(private configC: NgbCarouselConfig, private iniciativaService: IniciativaService, private ongService: OngService, private voluntarioService: VoluntarioService) { }
  public ong: Ong;
  public uid: string;
  public solicitudes: Array<Solicitud> = [];
  public solis: Array<auxAdministrar> = [];



  ngOnInit(): void {

    this.llenar();
    console.log('solicitudes', this.solicitudes);
  }

  llenar() {

    this.uid = localStorage.getItem('uid');
    this.ongService.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;

      this.ong.iniciativas.forEach(item => {
        this.iniciativaService.consultarIniciativaByID(item).then(resp2 => {
          let ini = resp2.data() as Iniciativa;


          ini.solicitudes.forEach(item3 => {
            this.iniciativaService.consultarSolicitudByID(item3).then(resp3 => {
              let sol = resp3.data() as Solicitud;

              this.voluntarioService.consultarVoluntarioByID(sol.idVoluntario).then(resp4 => {
                let vol = resp4.data() as Voluntario;
                aux.nombreVoluntaro = vol.nombre;
              });

              let aux = new auxAdministrar();

              aux.idIniciativa = ini.id;
              aux.nombreIniciativa = ini.nombre;
              aux.idVoluntario = sol.idVoluntario;
              aux.idOng = sol.idOng;
              aux.id = sol.id;
              aux.aceptado = sol.aceptado;
              aux.contestado = sol.contestado
              this.solis.push(aux);
              this.solicitudes.push(sol);
            });
          });
        });
      });
    });
  }
}
