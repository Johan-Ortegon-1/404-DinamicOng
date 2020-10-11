import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { VoluntarioService } from '../services/voluntario.service';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
export class VerMiPerfilComponent implements OnInit {

  constructor() {}

  // tslint:disable-next-line: ban-types
  texto: string;

  voluntario: Voluntario;
  nombre: string;

  voluntaroService: VoluntarioService;

  ngOnInit(): void {
    console.log("nombre ", "camilo moreno");
    this.texto = 'Aqui comprobando ts';
    const id = 'fEZlOu94IEeV27fKfRBGINrj9zK2';
    this.voluntario = new Voluntario();

    this.voluntaroService.consultarVoluntarioByID('fEZlOu94IEeV27fKfRBGINrj9zK2').then(resp => {
      this.voluntario = resp.data() as Voluntario;

      console.log("voluntario", this.voluntario.nombre);
    });

    console.log("nombre de voluntario ", this.voluntario.nombre);


  }

}
