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
  public iniciativas: Iniciativa[] = [];
  public voluntarios: Voluntario[] = [];
  public solicitudes: Solicitud[] = [];
  public solis: AuxAdministrar[] = [];

  public aux: AuxAdministrar = new AuxAdministrar();

  ngOnInit(): void {
    this.llenar();
  }
  aceptar(id: string) {
    let iniciativa: string;
    let voluntario: string;
    // actualizar solicitudes temporales
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
        iniciativa = iter.idIniciativa;
        voluntario = iter.idVoluntario;
      }
    }
    // actualizar solicitudes en Firebase
    for (const iter2 of this.solicitudes) {
      if (id === iter2.id) {
        iter2.contestado = true;
        iter2.aceptado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }
    // actualizar la iniciativa
    let index = 0;
    for (const iter3 of this.iniciativas) {
      if (iniciativa === iter3.id) {
        iter3.participantes.push(voluntario);
        for (const ini of this.solicitudes) {
          if (ini.idIniciativa === iniciativa ) {
            iter3.solicitudes.splice(index, 1);
            this.iniciativaService.updateIniciativa(iter3);
          }
          index++;
        }
      }
    }
    // actualizar la participacion del usuario
    for (const vol of this.voluntarios) {
      if (voluntario === vol.id) {
          vol.participaciones.push(iniciativa);
          this.voluntarioService.updateVoluntario(vol);
      }
    }
  }

  rechazar(id: string) {
    let iniciativa: string;
    let voluntario: string;
    // actualizar solicitudes temporales
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
        iniciativa = iter.idIniciativa;
        voluntario = iter.idVoluntario;
      }
    }
    for (const iter2 of this.solicitudes) {
      if (id === iter2.id) {
        iter2.contestado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }
    let index = 0;
    for (const iter3 of this.iniciativas) {
      if (iniciativa === iter3.id) {
        for (const ini of this.solicitudes) {
          if (ini.idIniciativa === iniciativa ) {
            iter3.solicitudes.splice(index, 1);
            this.iniciativaService.updateIniciativa(iter3);
          }
          index++;
        }
      }
    }
  }

  llenar() {
    // Obtencion del id de sesion
    this.uid = localStorage.getItem('uid');
    // Buscar la en la DB la ong
    this.ongService.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;
      // Por la ong recorre las iniciativas
      this.ong.iniciativas.forEach(item => {
        this.iniciativaService.consultarIniciativaByID(item).then(resp2 => {
          const ini = resp2.data() as Iniciativa;
          // revisa todas las solicitudes pendientes que tiene
          let sol = new Solicitud();
          ini.solicitudes.forEach(item3 => {
            this.iniciativaService.consultarSolicitudByID(item3).then(resp3 => {
              sol = resp3.data() as Solicitud;
              const variable = sol.contestado;

              if (variable != null) {
                if (sol.contestado === true) {
                  this.solicitudes.push(sol);
                } else {
                  const aux = new AuxAdministrar();
                  this.voluntarioService.consultarVoluntarioByID(sol.idVoluntario).then(resp4 => {
                    const vol = resp4.data() as Voluntario;
                    aux.nombreVoluntaro = vol.nombre;
                    aux.idVoluntario = vol.id;
                    aux.idIniciativa = ini.id;
                    aux.nombreIniciativa = ini.nombre;
                    aux.idOng = sol.idOng;
                    aux.id = sol.id;
                    aux.aceptado = sol.aceptado;
                    aux.contestado = sol.contestado;

                    this.solis.push(aux);
                    this.solicitudes.push(sol);
                    this.voluntarios.push(vol);
                    this.iniciativas.push(ini);
                  });
                }
              }
            });
          });
        });
      });
    });
  }
}
