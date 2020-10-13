import { Component, OnInit } from '@angular/core';
import { Ong } from '../../models/ong';
import { Iniciativa } from '../../models/iniciativa';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { IniciativaService } from '../../iniciativa/services/iniciativa.service';
import { OngService } from '../services/ong.service';
import { Solicitud } from '../../models/solicitud';
import { VoluntarioService } from '../../voluntario/services/voluntario.service';
import { Voluntario } from '../../models/voluntario';
import { AuxAdministrar } from 'src/app/models/auxAdministrar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-voluntarios',
  templateUrl: './administrar-voluntarios.component.html',
  styleUrls: ['./administrar-voluntarios.component.css']
})
export class AdministrarVoluntariosComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private configC: NgbCarouselConfig, private iniciativaService: IniciativaService, private ongService: OngService, private voluntarioService: VoluntarioService, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }
  public ong: Ong;
  public uid: string;
  public solicitudes: Array<Solicitud> = [];
  public solis: Array<AuxAdministrar> = [];



  ngOnInit(): void {

    this.llenar();
    console.log('solicitudes', this.solicitudes);
  }

  aceptar(id: string) {
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
      }
    }

    for (const iter2 of this.solicitudes){
      if (id === iter2.id)
      {
        iter2.contestado = true;
        iter2.aceptado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }

  }

  rechazar(id: string) {
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
      }
    }

    for (const iter2 of this.solicitudes){
      if (id === iter2.id)
      {
        iter2.contestado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }
  }

  llenar() {

    this.uid = localStorage.getItem('uid');
    this.ongService.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;

      this.ong.iniciativas.forEach(item => {
        this.iniciativaService.consultarIniciativaByID(item).then(resp2 => {
          const ini = resp2.data() as Iniciativa;


          ini.solicitudes.forEach(item3 => {
            this.iniciativaService.consultarSolicitudByID(item3).then(resp3 => {
              const sol = resp3.data() as Solicitud;

              if (sol.contestado === true) {
                this.solicitudes.push(sol);
              } else {
                const aux = new AuxAdministrar();
                this.voluntarioService.consultarVoluntarioByID(sol.idVoluntario).then(resp4 => {
                  const vol = resp4.data() as Voluntario;
                  aux.nombreVoluntaro = vol.nombre;
                });

                aux.idIniciativa = ini.id;
                aux.nombreIniciativa = ini.nombre;
                aux.idVoluntario = sol.idVoluntario;
                aux.idOng = sol.idOng;
                aux.id = sol.id;
                aux.aceptado = sol.aceptado;
                aux.contestado = sol.contestado;
                this.solis.push(aux);
                this.solicitudes.push(sol);
              }
            });
          });
        });
      });
    });
  }
}
