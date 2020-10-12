import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-ong',
  templateUrl: './register-ong.component.html',
  styleUrls: ['./register-ong.component.css']
})
export class RegisterOngComponent implements OnInit {

  public ong: Ong;

  public contrasena: string;
  public confirmContrasena: string;

  public preview: string;
  public telefonoNuevo = '';
  public errorTelefonos = '';

  constructor(private authSvc: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.ong = new Ong();
  }

  async registrar() {
    if (this.contrasena === this.confirmContrasena) {
      const result = (await this.authSvc.registerOng(this.ong, this.contrasena));
      console.log(result);
      if(result == null) {
        alert('ERROR: Ya existe un usuario con ese correo, por favor ingrese otro');
      } else {
        this.router.navigate(['/ong']);
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

      if (this.ong.telefonos.indexOf(this.telefonoNuevo) == -1) {

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
