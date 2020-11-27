import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';
import { IniciativaService } from '../services/iniciativa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ong } from '../../models/ong';
import { OngService } from '../../ong/services/ong.service';
import { Voluntario } from '../../models/voluntario';
import { Valoracion } from '../../models/valoracion';
import { ChatService } from '../../chat/services/chat.service';
import { Conversacion } from '../../models/conversacion';

@Component({
  selector: 'app-ver-iniciativa',
  templateUrl: './ver-iniciativa.component.html',
  styleUrls: ['./ver-iniciativa.component.css']
})

// Clase que representa el componente de ver-iniciativa
export class VerIniciativaComponent implements OnInit {

  public iniciativa: Iniciativa; // Objeto de la iniciativa a mostrar
  public puntaje: number; // Puntaje promedio de la iniciativa
  public id: string; // Identificador de la iniciativa
  public participantes: Array<Voluntario>; // Lista de objetos Voluntario que representa los participantes de la iniciativa
  public imagenes: Array<string>; // Lista de las URL's de las imagenes de la iniciativa
  public creador: Ong; // Objeto de la Ong creadora
  public valoracionNueva: Valoracion; // Objeto Valoracion que identifica la nueva valoración que podría dar un voluntario

  public isOng: boolean; // Bandera que indica si el usuario que ingresó es una Ong
  public creatorOng: boolean; // Bandera que indica si el usuario que ingresó es la Ong Creadora
  public participante: boolean; // Bandera que indica si el usuario que ingresó es un voluntario inscrito
  public empezo: boolean; // Bandera que indica si la iniciativa ya empezó
  public comento: boolean; // Bandera que indica si el voluntario inscrito ya comentó la iniciativa
  public solicito: boolean; // Bandera que indica si el voluntario no inscrito ya solicitó unirse a la iniciativa
  public hayCupos: boolean; // Bandera que indica si hay cupos disponibles en la iniciativa

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - iniciativaService: Objeto que permite el acceso al servicio de las iniciativas
  // - routeActive: Objeto que permite obtener parametros de la URL
  // - configC: Objeto que permite la configuración del carrusel de la previsualización de las imagenes
  // - router: Objeto que permite la navegación entre componentes por la URL
  // - ongService: Objeto que permite el acceso al servicio de las Ong's
  // - chatService: Objeto que permite el acceso al servicio de las conversaciones
  constructor(private iniciativaService: IniciativaService, private routeActive: ActivatedRoute,
    private router: Router, private configC: NgbCarouselConfig, private ongService: OngService, private chatService: ChatService) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializan atributos y listas
  ngOnInit(): void {
    this.valoracionNueva = new Valoracion();
    this.creador = new Ong();
    this.imagenes = [];
    this.participantes = [];
    this.creatorOng = false;
    this.hayCupos = true;
    this.solicito = false;
    this.comento = false;
    this.participante = false;
    this.empezo = false;
    this.iniciativa = new Iniciativa();
    this.id = this.routeActive.snapshot.paramMap.get('id');
    this.obtenerIniciativa();

  }

  // Metodo que obtiene el objeto de la iniciativa y realiza la lógica de identificación de usuario (banderas)
  obtenerIniciativa() {
    this.iniciativaService.consultarIniciativaByID(this.id).then(resp => {

      this.iniciativa = resp.data() as Iniciativa;
      this.obtenerParticipantes();
      this.calcularValoracion();
      const ruta = this.router.url;
      const str = String(ruta);

      if (str.includes('ong')) {

        this.isOng = true;
        const idOng = localStorage.getItem('uid');

        if (this.iniciativa.idOng == idOng) {
          this.creatorOng = true;
        } else {

          this.ongService.consultarOngByID(this.iniciativa.idOng).then(resp => {

            this.creador = resp.data() as Ong;
            this.ongService.obtenerImagenPerfil(this.creador.id).then(url =>{

              this.creador.imagenPerfil = url;

            });

          });

        }
      } else if (str.includes('voluntario')) {

        this.isOng = false;
        const idVol = localStorage.getItem('uid');

        this.ongService.consultarOngByID(this.iniciativa.idOng).then(resp => {

          this.creador = resp.data() as Ong;
          this.ongService.obtenerImagenPerfil(this.creador.id).then(url => {

            this.creador.imagenPerfil = url;

          });

        });

        if (this.iniciativa.participantes.length == this.iniciativa.cantidadMaxVoluntarios) {
          this.hayCupos = false;
        }

        if (this.iniciativa.participantes.indexOf(idVol) != -1) {

          this.participante = true;
          this.yaComento(idVol);

        } else {

          this.iniciativaService.consultarSolicitud(idVol, this.iniciativa.id).then(resp => {
            if (!resp.empty) {
              this.solicito = true;
            }
          }, error => {
            console.log(error);
            this.solicito = false;
          });

        }

      } else {
        this.router.navigate(['']);
      }

      if (this.iniciativaService.compararFechaMenorIgualHoy(this.iniciativa.fechaInicio)) {
        this.empezo = true;
      }

      this.imagenes = this.iniciativaService.obtenerImagenesIniciativa(this.iniciativa.id);

    }, error => {
      console.log(error);
    });
  }

  // Metodo que calcula la valoración en promedio y llena las estrellas
  calcularValoracion() {
    let res = 0;
    this.iniciativa.valoraciones.forEach(v => {
      res += v.puntaje;
    });
    res /= this.iniciativa.valoraciones.length;
    this.puntaje = res;
    res = res / 5 * 100;
    res = Math.round(res / 10) * 10;
    document.getElementById('estrella').style.width = '' + res + '%';
  }

  // Metodo que obtiene los objetos de los voluntarios inscritos
  obtenerParticipantes() {
    this.participantes = this.iniciativaService.obtenerParticipantes(this.iniciativa.participantes);
  }

  // Metodo que obtiene el objeto de un voluntario inscrito mediante el id
  // Parámetros:
  // - id: Identificador del voluntario
  // Retorno: Objeto del voluntario inscrito
  obtenerParticipanteById(id: string): Voluntario {
    let participante = new Voluntario();
    for (let p of this.participantes) {
      if (p.id == id) {
        participante = p;
        break;
      }
    }
    return participante;
  }

  // Metodo que inserta la valoración nueva
  comentar() {
      this.valoracionNueva.idValorador = localStorage.getItem('uid');
      this.iniciativa.valoraciones.push(this.valoracionNueva);
      this.iniciativaService.updateIniciativa(this.iniciativa);
      this.comento = true;
      this.calcularValoracion();
  }

  // Metodo que identifica si un voluntario inscrito ya comentó/valoró la iniciativa
  yaComento(idPart: string) {
    for (let val of this.iniciativa.valoraciones) {
      if (val.idValorador == idPart) {
        this.comento = true;
        break;
      }
    }
  }

  // Metodo que crea la solicitud de postulación de un voluntario no inscrito
  solicitarUnirse() {

    if (this.iniciativa.participantes.length < this.iniciativa.cantidadMaxVoluntarios) {
      const idVol = localStorage.getItem('uid');
      this.iniciativaService.solicitarUnirse(this.iniciativa, idVol);
      alert('Se ha realizado la solicitud con exito');
      this.solicito = true;
    } else {
      alert('NO se pudo realizar la solicutud, pues los cupos ya están completamente llenos');
    }
  }

  // Metodo que crea una conversación con la Ong y redirige al usuario hacia allá
  contactarOng() {
    this.chatService.obtenerConversacionByIdOngIdVol(this.creador.id, localStorage.getItem('uid')).then(resp => {
      if (resp.empty) {
        let conversacion = new Conversacion();
        conversacion.idOng = this.creador.id;
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

  // Metodo que permite navegar hacia la vista de la Ong
  navOng(id: string) {
    const ruta = this.router.url;
    const str = String(ruta);
    if (str.includes('voluntario')) {
      this.router.navigate(['/voluntario/ver-ong/' + id]);
    } else if (str.includes('ong')) {
      //this.router.navigate(['/ong/ver-ong/' + id]);
    }
  }

  redirigir(id: string) {
    const ruta = this.router.url;
    const str = String(ruta);
    if (str.includes('voluntario')) {
      this.router.navigate(['/voluntario/ver-voluntario/' + id]);
    } else if (str.includes('ong')) {
      this.router.navigate(['/ong/ver-voluntario/' + id]);
    }
  }

}
