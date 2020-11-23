import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { VoluntarioService } from '../services/voluntario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Conocimiento } from '../../models/conocimiento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
// Clase que representa el componente ver mi perfil de un Voluntario

export class VerMiPerfilComponent implements OnInit {

  public voluntario: Voluntario; // Objeto donde se almacena el voluntario actual
  public uid: string;// String donde se almacena el id de la sesión
  public conocimientos: Conocimiento[] = [];// Arreglo donde se almacena la lista de conomientos de un voluntario
  public conocimiento: Conocimiento;//Objeto donde se almacena un conocimiento del voluntario
  public prueb: string;
  public idim: string[];//Arreglo donde se almacenan los idiomas que habla el voluntario
  public telefonos: string[];//Arreglo donde se almacenan los teléfonos del voluntario
  constructor(private voluntarioServices: VoluntarioService, private configC: NgbCarouselConfig,  private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }
 // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.voluntario = new Voluntario();
    this.uid = localStorage.getItem('uid');

    this.voluntarioServices.obtenerImagenPerfil(this.uid).then(url => {
      this.voluntario.imagenPerfil = url;
    });


    this.voluntarioServices.consultarVoluntarioByID(this.uid).then(resp => {
      this.voluntario = resp.data() as Voluntario;
      this.prueb = this.voluntario.nombre;
      this.conocimientos = this.voluntario.habilidades;
      this.idim = this.voluntario.idiomas;
      this.telefonos = this.voluntario.telefonos;

      this.voluntarioServices.obtenerImagenPerfil(this.uid).then(url => {
        this.voluntario.imagenPerfil = url;
      });

    });
  }
// Método que lleva a la página de edición del perfil
  editarPerfil(): void
  {
    this.router.navigate(['/voluntario/editar-perfil']);
  }

}
