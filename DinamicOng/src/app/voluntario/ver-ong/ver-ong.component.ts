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
// Clase que representa el componente para mostrar el usuario Ong desde el usuario voluntario
export class VerOngComponent implements OnInit {

  public ong:Ong = new Ong();
  public iniciativas: Iniciativa[]=[];
  public telefonoNuevo = '';
  public errorTelefonos = '';
  public seguido: boolean = false;
  public estado: string = 'Seguir';
  public isOng: boolean = false;

  // Metodo constructor para crear un objeto del componente
  // Parametros:
  // - ongService: Objeto que permite llamar los servicios relacionadas a la Ong
  // - iniciativaService: Objeto que permite llamar las servicios relacionadas a la iniciativa
  // - route: Objeto que permite obtener Parametros de la ruta
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - chatService: Objeto que permite llamar los servicios relacionados al chat
  constructor(private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute,
    private router: Router, private chatService: ChatService,private voluntarioService: VoluntarioService) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.ong.id = this.route.snapshot.paramMap.get('id');
    const ruta = this.router.url;
    const str = String(ruta);
    const rol = localStorage.getItem("rol");

    if (rol=='Ong') {​​​​​​
      this.isOng = true;
    }​​​​​​
    else {​​​​​​
      this.isOng = false;
    }​​​​​​
    this.obtenerOngActual();
    this.preguntar();
  }

  // Metodo que se ejecuta para obtener la informacion de la Ong y mostrala en la vista
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

  // Metodo que se ejecuta al iniciar el componente
  // Parametros:
  // - idiniciativa: string que identifica a una iniciativa
  // - cont: number que dice la posicion en el arreglo de iniciativas
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
        setTimeout(()=>{
          this.router.navigate(['/voluntario/chat/' + id]);
        }, 500);
      } else {
        resp.forEach(c => {
          let aux = c.data() as Conversacion;
          this.router.navigate(['/voluntario/chat/' + aux.id]);
        });
      }
    });
  }

  // Metodo que navega hacia una inciativa de la Ong
  // Parametros:
  // - id: string que identifica a una iniciativa
  redirigir(id: string) {
    if (localStorage.getItem('rol') == 'Voluntario') {
      this.router.navigate(['/voluntario/iniciativa/' + id]);
    }else {
      this.router.navigate(['/ong/iniciativa/' + id]);
    }
  }
  // Este metodo sirve para la funcionalidad de seguir a una Ong o dejarla de seguir si ya se sigue
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
  // Este metodo revisa si la Ong que se esta viendo ya se esta sigiendo.
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
          // aca se determina si se esta siguiendo el boton cambia de estado
          if (item === this.ong.id) {
            this.estado = 'Dejar de Seguir';
            this.seguido = true;
          }
        });
      }
    });
  }
}
