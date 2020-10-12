import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { VoluntarioService } from '../services/voluntario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Conocimiento } from '../../models/conocimiento';

@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
export class VerMiPerfilComponent implements OnInit {

  public voluntario: Voluntario;
  public uid: string;
  public conocimientos: Conocimiento[] = [];
  public conocimiento: Conocimiento;
  public prueb: string;
  public idim: string[];
  public telefonos: string[];
  constructor(private voluntarioServices: VoluntarioService, private configC: NgbCarouselConfig) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
   }

  ngOnInit(): void {
    this.voluntario = new Voluntario();
    this.uid = 'fEZlOu94IEeV27fKfRBGINrj9zK2';

    this.voluntarioServices.consultarVoluntarioByID(this.uid).then(resp  => {
      this.voluntario = resp.data() as Voluntario;
      this.prueb = this.voluntario.nombre;
      this.conocimientos = this.voluntario.habilidades;
      this.idim = this.voluntario.idiomas;
      this.telefonos = this.voluntario.telefonos;

  });
}

}
