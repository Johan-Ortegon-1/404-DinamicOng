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

  public iniciativas: Iniciativa[] = []; // Arreglo de iniciativas pertenecientes a las Ong que el Voluntario sigue
  public seguidos: Array<string> = []; // Arreglo de strings que contiene los id de las Ong que sigo
  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - ongService: Objeto que permite el acceso a los servicios de la ONG
  // - voluntarioService: Objeto que permite el acceso a los servicios de un voluntario
  // -iniciativaServices: Objeto que permite el acceso a los servicio de una iniciativa
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private ongService: OngService, private voluntarioService: VoluntarioService, private iniciativaService: IniciativaService) { }

  // metodo que se ejecuta al iniciar
  ngOnInit(): void {
    console.log('entro');
    this.iniciar();
  }

  // Este metodo obtiene todas las iniciativas de las ONG que un usuario esta siguiendo
  iniciar() {
    const id = localStorage.getItem('uid');
    this.voluntarioService.consultarVoluntarioByID(id).then(resp => {
      const voluntario = resp.data() as Voluntario;
      voluntario.seguidos.forEach(item => {
        this.ongService.consultarOngByID(item).then( resp1 => {
          const ong = resp1.data() as Ong;
          ong.iniciativas.forEach(item2 => {
            this.iniciativaService.consultarIniciativaByID(item2).then(resp2 => {
              const ini = resp2.data() as Iniciativa;
              const aux = new Iniciativa();
              // Esta parte captura las imagenes de la Storage
              this.ongService.obtenerImagenPerfil(ong.id).then(url => {
                ong.imagenPerfil = url;
                ini.imagenes = this.iniciativaService.obtenerImagenesIniciativa(ini.id);
                ini.imagenPerfil = ong.imagenPerfil;
                ini.nombreOng = ong.nombre;
                // Se agrega a una lista las iniciativas de cada ONG que el Voluntario sigue
                this.iniciativas.push(ini);
              });
            });
          });
        });
      });
    });
  }
  // Metodo que redirecciona a ver la Ong
  navVerOng(iniciativa: Iniciativa) {
    this.router.navigate(['/voluntario/ver-ong/' + iniciativa.idOng]);
  }
  // Metodo que redirecciona a la iniciativa
  navVerIni(id: string) {
    this.router.navigate(['/voluntario/iniciativa/' + id]);
  }
}
