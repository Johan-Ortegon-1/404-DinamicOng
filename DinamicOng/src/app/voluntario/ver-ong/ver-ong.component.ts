import { Component, OnInit } from '@angular/core';
import { OngService } from './../../ong/services/ong.service';
import { IniciativaService } from './../../iniciativa/services/iniciativa.service';
import { Ong } from './../../models/ong';
import { Iniciativa } from './../../models/iniciativa';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../chat/services/chat.service';
import { Conversacion } from '../../models/conversacion';

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

  constructor(private ongService: OngService, private iniciativaService: IniciativaService, private route: ActivatedRoute,
    private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.ong.id = this.route.snapshot.paramMap.get('id');
    this.obtenerOngActual();
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

}
