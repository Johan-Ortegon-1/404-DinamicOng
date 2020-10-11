import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { VoluntarioService } from '../services/voluntario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
export class VerMiPerfilComponent implements OnInit {


  public voluntario: Voluntario;
  public uid: string;

  public texto: string;

  constructor(private voluntarioServices: VoluntarioService, private configC: NgbCarouselConfig) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  ngOnInit(): void {
    console.log("nombre ", "camilo moreno");

    let voluntario2;

    this.voluntario = new Voluntario();
    this.uid = 'fEZlOu94IEeV27fKfRBGINrj9zK2';

    this.voluntarioServices.consultarVoluntarioByID(this.uid).then(resp  => {
      this.voluntario = resp.data() as Voluntario;

      console.log("voluntario" , this.voluntario)

    });



  }

}
