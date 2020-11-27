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
//Clase que representa el componente de administrar voluntarios por parte de una ONG
export class AdministrarVoluntariosComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private configC: NgbCarouselConfig, private iniciativaService: IniciativaService, private ongService: OngService, private voluntarioService: VoluntarioService, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }
  public ong: Ong; // Objeto que representa la ONG que administrará la postulación
  public uid: string;//String donde se indicará el id de la sesión
  public iniciativas: Iniciativa[] = [];// Secuecia para almacenar las iniciativas de la ONG
  public voluntarios: Voluntario[] = [];// Secuecia para almacenar los voluntarios postulados
  public solicitudes: Solicitud[] = [];// Secuecia para almacenar las solicitudes por parte de los voluntarios
  public solis: AuxAdministrar[] = []; // Secuecia para almacenar estructuras auxiliares

  public aux: AuxAdministrar = new AuxAdministrar();
  // Metodo que se ejecuta al iniciar el componente
  // Se obtiene toda la información referente a la postulación (Información del voluntario y de la iniciativa)
  ngOnInit(): void {
    this.llenar();
  }
  // Metodo para aceptar un Voluntario postulado a una convocatoria
  // Parámetros:
  // - id: String con el cual se busca la solicitud en la base de datos de solicitudes
  aceptar(id: string) {
    let iniciativa: string;
    let voluntario: string;
    // En este ciclo se actualizan las solicitudes temporales
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
        iniciativa = iter.idIniciativa;
        voluntario = iter.idVoluntario;
      }
    }
    //  En este ciclo se actualizan las solicitudes en Firebase
    for (const iter2 of this.solicitudes) {
      if (id === iter2.id) {
        iter2.contestado = true;
        iter2.aceptado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }
    // En estos ciclos se actualiza la información de la iniciativa, agregando el voluntario
    let index = 0;
    for (const iter3 of this.iniciativas) {
      if (iniciativa === iter3.id) {
        iter3.participantes.push(voluntario);
        for (const ini of this.solicitudes) {
          if (ini.idIniciativa === iniciativa) {
            iter3.solicitudes.splice(index, 1);
            this.iniciativaService.updateIniciativa(iter3);
          }
          index++;
        }
      }
    }
    // En este ciclo se actualiza la participacion del voluntario, agregando la iniciativa a las participaciones de este
    for (const vol of this.voluntarios) {
      if (voluntario === vol.id) {
        vol.participaciones.push(iniciativa);
        this.voluntarioService.updateVoluntario(vol);
      }
    }
  }
  // Método para rechazar un Voluntario postulado a una convocatoria
  // Parámetros:
  // - id: String con el cual se busca la solicitud en la base de datos de solicitudes
  rechazar(id: string) {
    let iniciativa: string;
    let voluntario: string;
    //En este ciclo se actualizan las solicitudes temporales
    for (const iter of this.solis) {
      if (id === iter.id) {
        iter.contestado = true;
        iniciativa = iter.idIniciativa;
        voluntario = iter.idVoluntario;
      }
    }
    //En este ciclo se actualizan las solicitudes en firebase

    for (const iter2 of this.solicitudes) {
      if (id === iter2.id) {
        iter2.contestado = true;
        this.iniciativaService.updateSolicitud(iter2);
      }
    }
    // En estos ciclos se actualiza la información de la iniciativa

    let index = 0;
    for (const iter3 of this.iniciativas) {
      if (iniciativa === iter3.id) {
        for (const ini of this.solicitudes) {
          if (ini.idIniciativa === iniciativa) {
            iter3.solicitudes.splice(index, 1);
            this.iniciativaService.updateIniciativa(iter3);
          }
          index++;
        }
      }
    }
  }

  // Metodo para obtener la información de las postulaciones a la convocatoria
  llenar() {
    // Se obtiene el id de la sesion
    this.uid = localStorage.getItem('uid');
    // Se Busca la ONG en la base de datos
    this.ongService.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;
      // Se recorren las iniciativas de la ONG
      this.ong.iniciativas.forEach(item => {
        this.iniciativaService.consultarIniciativaByID(item).then(resp2 => {
          const ini = resp2.data() as Iniciativa;
          // Se revisan todas las solicitudes pendientes que se tengan
          let sol = new Solicitud();
          ini.solicitudes.forEach(item3 => {
            this.iniciativaService.consultarSolicitudByID(item3).then(resp3 => {
              sol = resp3.data() as Solicitud;
              const variable = sol.contestado;

              if (variable != null) {
                if (sol.contestado === true) {
                  this.solicitudes.push(sol);
                } else {
                  //se crea una clase auxiliar para guardar datos relacionales entre voluntario, iniciativa, solicitud, ong
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
