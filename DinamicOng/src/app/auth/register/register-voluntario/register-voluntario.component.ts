import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { AuthService } from '../../services/auth.service';
import { IdiomasDisponibles } from '../../../models/idiomas';
@Component({
  selector: 'app-register-voluntario',
  templateUrl: './register-voluntario.component.html',
  styleUrls: ['./register-voluntario.component.css']
})
export class RegisterVoluntarioComponent implements OnInit {

  public ong: Ong;

  public contrasena: string;
  public confirmContrasena: string;

  public preview: string;
  public telefonoNuevo = '';
  public errorTelefonos = '';
  public idiomas: IdiomasDisponibles;
  public misIdiomas: string[];

  constructor(private authSvc: AuthService) { }


  ngOnInit(): void {
    this.ong = new Ong();
    this.misIdiomas = 
  }

  async registrar() {
    if (this.contrasena === this.confirmContrasena) {
      const result = (await this.authSvc.registerOng(this.ong, this.contrasena));
      console.log(result);
      if(result == null) {
        alert('ERROR: Ya existe un usuario con ese correo, por favor ingrese otro');
      } else {
        // Avanzar a la pantalla de la Ong
      }
    } else {
      alert('ERROR: Las contraseñas no coinciden');
    }
  }

  uploadImage($event) {

    if ($event.target.files && $event.target.files[0]) {

      this.ong.imagenPerfil = $event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      }

      reader.readAsDataURL($event.target.files[0]);
    }
  }

  addTelefono() {

    if (this.telefonoNuevo !== '' && this.telefonoNuevo != null) {

      if (this.ong.telefonos.indexOf(this.telefonoNuevo) === -1) {

        const str  = String(this.telefonoNuevo);
        if (!str.includes('-')) {
          this.ong.telefonos.push(this.telefonoNuevo);
          this.telefonoNuevo = '';
          this.errorTelefonos = '';
        } else {
          this.errorTelefonos = 'Ingrese solo números';
        }

      } else {
        this.errorTelefonos = 'El teléfono ya existe, ingrese un teléfono distinto';
      }

    } else {
      this.errorTelefonos = 'Ingrese un teléfono';
    }
  }

  deleteTelefono(tel: string) {
    const i = this.ong.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.ong.telefonos.splice( i, 1 );
    }
  }

}
