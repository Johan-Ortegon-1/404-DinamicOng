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

// Clase que representa el componente de mis-participaciones
export class MisParticipacionesComponent implements OnInit {

  public participaciones = []; // Lista de las iniciativas en las que el voluntario ha participado

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - voluntarioService: Objeto que permite el manejo de los voluntarios
  // - ongService: Objeto que permite el manejo de las Ong's
  // - iniciativaService: Objeto que permite el manejo de las iniciativass
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private voluntarioService: VoluntarioService, private ongService: OngService,
    private router: Router, private iniciativaService: IniciativaService) { }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    const idVol = localStorage.getItem('uid');
    this.participaciones = this.obtenerParticipaciones(idVol);
  }

  // Metodo que redirige dependiendo del tipo
  // Parámetros:
  // - tipo: Representa si se debe redireccionar a ver-ong o a la iniciativa
  // - id: Identificador de la iniciativa o de la Ong
  redirigir(tipo: number, id: string) {
    if (tipo == 1) {
      this.router.navigate(['/voluntario/ver-ong/' + id]);
    } else if (tipo == 2) {
      this.router.navigate(['/voluntario/iniciativa/' + id]);
    }
  }

  // Metodo que obtiene las iniciativas en las que el voluntario ha participado
  // Parámetros:
  // - id: Identificador del voluntario
  // Retorno: Lista con las iniciativas en las que ha participado el voluntario
  obtenerParticipaciones(id: string) {
    let iniciativas = [];
    this.voluntarioService.consultarVoluntarioByID(id).then(resp => {
      let vol = resp.data() as Voluntario;
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
