import { Component, OnInit } from '@angular/core';
import { OngService } from './../../ong/services/ong.service';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { Ong } from './../../models/ong';
import { Iniciativa } from './../../models/iniciativa';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../chat/services/chat.service';
import { Conversacion } from '../../models/conversacion';
import { VoluntarioService } from '../services/voluntario.service';
import { Voluntario } from 'src/app/models/voluntario';

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
  public seguido: boolean = false;
  public estado: string = 'Seguir';


  constructor(private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute,
    private router: Router, private chatService: ChatService,private voluntarioService: VoluntarioService) { }

  ngOnInit(): void {
    this.ong.id = this.route.snapshot.paramMap.get('id');
    this.obtenerOngActual();
    this.preguntar();
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

  // Metodo que crea una conversación con la Ong y redirige al usuario hacia allá
  contactarOng() {
    this.chatService.obtenerConversacionByIdOngIdVol(this.ong.id, localStorage.getItem('uid')).then(resp => {
      if (resp.empty) {
        let conversacion = new Conversacion();
        conversacion.idOng = this.ong.id;
        conversacion.idVoluntario = localStorage.getItem('uid');
        let id = this.chatService.crearConversacion(conversacion);
        this.router.navigate(['/voluntario/chat/' + id]);
      } else {
        resp.forEach(c => {
          let aux = c.data() as Conversacion;
          this.router.navigate(['/voluntario/chat/' + aux.id]);
        });
      }
    });
  }

  redirigir(id: string) {
    if (localStorage.getItem('rol') == 'Voluntario') {
      this.router.navigate(['/voluntario/iniciativa/' + id]);
    }
  }

  seguir() {
    const id = localStorage.getItem('uid');
    const ong = this.ong.id;
    if (!this.seguido) {
      this.voluntarioService.consultarVoluntarioByID(id).then(resp1 => {
        const vol = resp1.data() as Voluntario;
        vol.seguidos.push(ong);
        this.estado = 'Dejar de seguir';
        this.seguido = true;
        this.voluntarioService.updateVoluntario(vol);
      });
    } else {
      this.voluntarioService.consultarVoluntarioByID(id).then(resp2 => {
        const vol = resp2.data() as Voluntario;
        let cont = 0;
        vol.seguidos.forEach(item => {
          if (item === ong) {
            this.seguido = false;
            this.estado = 'Seguir';
            vol.seguidos.splice(cont, 1 );
            this.voluntarioService.updateVoluntario(vol);
          }
          cont++;
        });
      });
    }
  }

  preguntar() {
    let id =  localStorage.getItem('uid');
    this.voluntarioService.consultarVoluntarioByID(id).then(resp2 => {
      const vol = resp2.data() as Voluntario;
      console.log('tamañ' ,vol.seguidos.length);
      if (vol.seguidos.length === 0) {
        this.estado = 'Seguir';
        this.seguido = false;
      } else {
        vol.seguidos.forEach(item => {
          console.log("item " , item);
          if (item === this.ong.id) {
            this.estado = 'Dejar de Seguir';
            this.seguido = true;
          }
        });
      }
    });
  }

}
