import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { Ubicacion } from '../../../models/ubicacion';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-ong',
  templateUrl: './register-ong.component.html',
  styleUrls: ['./register-ong.component.css']
})
export class RegisterOngComponent implements OnInit {

  public nuevaOng = {
    pathImagen: "",
    nombre: "",
    correo: "",
    telefonos: [],
    mision: "",
    vision: "",
    pais: "",
    ciudad: "",
    direccion: ""
  };

  public contrasena;
  public confirmContrasena;

  public preview;
  public telefonoNuevo = '';
  public errorTelefonos = '';

  constructor(private authSvc: AuthService) { }


  ngOnInit(): void {
  }

  onClick() {
    if (this.contrasena == this.confirmContrasena)
    {
      const ong = new Ong('', this.nuevaOng.nombre, this.nuevaOng.correo, this.nuevaOng.telefonos,
      new Ubicacion(this.nuevaOng.ciudad, this.nuevaOng.pais, this.nuevaOng.direccion), this.nuevaOng.pathImagen,
      this.nuevaOng.mision, this.nuevaOng.vision);

      this.authSvc.registerOng(ong, this.contrasena);
    }
  }

  uploadImage($event) {

    if ($event.target.files && $event.target.files[0]) {

      this.nuevaOng.pathImagen = $event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      }

      reader.readAsDataURL($event.target.files[0]);
    }
  }

  addTelefono() {

    if (this.telefonoNuevo != '' && this.telefonoNuevo != null) {

      if (this.nuevaOng.telefonos.indexOf(this.telefonoNuevo) == -1) {

        const str  = String(this.telefonoNuevo);
        if (!str.includes('-')) {
          this.nuevaOng.telefonos.push(this.telefonoNuevo);
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
    const i = this.nuevaOng.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.nuevaOng.telefonos.splice( i, 1 );
    }
  }
}
