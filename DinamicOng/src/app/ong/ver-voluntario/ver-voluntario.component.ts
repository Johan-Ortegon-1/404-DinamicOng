import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IniciativaService } from 'src/app/iniciativa/services/iniciativa.service';
import { Iniciativa } from 'src/app/models/iniciativa';
import { Voluntario } from 'src/app/models/voluntario';
import { VoluntarioService } from 'src/app/voluntario/services/voluntario.service';
import { ChatService } from '../../chat/services/chat.service';
import { Conversacion } from '../../models/conversacion';

@Component({
  selector: 'app-ver-voluntario',
  templateUrl: './ver-voluntario.component.html',
  styleUrls: ['./ver-voluntario.component.css']
})
export class VerVoluntarioComponent implements OnInit {

  public voluntario: Voluntario = new Voluntario();
  public participaciones: Iniciativa[]=[];
  public telefonoNuevo = '';
  public errorTelefonos = '';

  constructor(private voluntarioService: VoluntarioService, private iniciativaService: IniciativaService,
    private route: ActivatedRoute, private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.voluntario.id = this.route.snapshot.paramMap.get('id');
    this.obtenerVoluntarioActual();
  }

  obtenerVoluntarioActual() {
    this.voluntarioService.consultarVoluntarioByID(this.voluntario.id).then(resp => {
      this.voluntario = resp.data() as Voluntario;
      this.voluntarioService.obtenerImagenPerfil(this.voluntario.id).then(url => {
        this.voluntario.imagenPerfil = url;
      });
      console.log(this.voluntario);

      //llenado de las iniciativas
      let cont = 0;
      for (let iter of this.voluntario.participaciones) {
        this.llenarListaParticipaciones(iter, cont);
        cont = cont + 1;
      }
    });
  }

  llenarListaParticipaciones(idiniciativa: string, cont: number) {
    console.log('Llenando lista: ' + idiniciativa);
    let nuevaIniciativa = new Iniciativa();
    this.iniciativaService.consultarIniciativaByID(idiniciativa).then(resp => {
      nuevaIniciativa = resp.data() as Iniciativa;
      this.participaciones.push(nuevaIniciativa);
      this.participaciones[cont].imagenes = this.iniciativaService.obtenerImagenesIniciativa(nuevaIniciativa.id);

    }, error => {
      console.log(error);
    });
  }
  navVerIniciativa(id: string){
    //redirige a ver iniciativa de otra ong aun no implementada
    //this.router.navigate(["/ong/iniciativa/" + id]);
  }

  // Metodo que crea una conversación con la Ong y redirige al usuario hacia allá
  contactarOng() {
    this.chatService.obtenerConversacionByIdOngIdVol(localStorage.getItem('uid'), this.voluntario.id).then(resp => {
      if (resp.empty) {
        let conversacion = new Conversacion();
        conversacion.idVoluntario = this.voluntario.id;
        conversacion.idOng = localStorage.getItem('uid');
        let id = this.chatService.crearConversacion(conversacion);
        this.router.navigate(['/ong/chat/' + id]);
      } else {
        resp.forEach(c => {
          let aux = c.data() as Conversacion;
          this.router.navigate(['/ong/chat/' + aux.id]);
        });
      }
    });
  }
}
