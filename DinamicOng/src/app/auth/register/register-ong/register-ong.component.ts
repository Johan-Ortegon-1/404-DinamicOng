import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-ong',
  templateUrl: './register-ong.component.html',
  styleUrls: ['./register-ong.component.css']
})

// Clase que representa el componente del Register de una Ong
export class RegisterOngComponent implements OnInit {

  public ong: Ong; // Objeto que se llenará mediante el registro

  public contrasena: string; // Contraseña ingresada por el usuario
  public confirmContrasena: string; // Constraña de verificación ingresada por el usuario

  public preview: string; // URL para mostrar la previsualización de la imagen de perfil de la Ong
  public telefonoNuevo = ''; // Teléfono nuevo para registrar en los telefonos de la Ong
  public errorTelefonos = ''; // Mensaje de error a mostrarle al usuario

  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - authSvc: Objeto que permite el acceso al servicio de Autenticación y Registro
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private authSvc: AuthService, private router: Router) { }

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializa el objeto Ong
  ngOnInit(): void {
    this.ong = new Ong();
  }

  // Metodo para realizar el registro de la Ong
  async registrar() {
    if (this.contrasena === this.confirmContrasena) {
      const result = (await this.authSvc.registerOng(this.ong, this.contrasena));
      console.log(result);
      if(result == null) {
        alert('ERROR: Ya existe un usuario con ese correo, por favor ingrese otro');
      } else {
        localStorage.setItem('uid', result.user.uid);
        localStorage.setItem('rol', 'Ong');
        this.router.navigate(['/ong']);
      }
    } else {
      alert('ERROR: Las contraseñas no coinciden');
    }
  }

  // Metodo para guardar la imagen de perfil de la Ong y en la previsualización
  // Parametros:
  // - $event: Evento resultante de un input file que contiene la imagen
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

  // Metodo para agregar un teléfono a la lista de teléfonos de la Ong
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

  // Metodo para eliminar un télefono de la lista de télefonos de la Ong
  deleteTelefono(tel: string) {
    const i = this.ong.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.ong.telefonos.splice( i, 1 );
    }
  }
}
