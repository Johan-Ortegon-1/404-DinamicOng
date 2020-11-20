import { Component, Input, OnInit } from "@angular/core";
import { Ong } from "src/app/models/ong";
import { Voluntario } from "src/app/models/voluntario";
import { Conocimiento } from "src/app/models/conocimiento";
import { AuthService } from "../../services/auth.service";
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Idiomas } from 'src/app/models/enumIdiomas';
import { Router } from '@angular/router';

// Clase que representa el componente del Register de una Ong
@Component({
  selector: "app-register-voluntario",
  templateUrl: "./register-voluntario.component.html",
  styleUrls: ["./register-voluntario.component.css"],
})
export class RegisterVoluntarioComponent implements OnInit {
  public ong: Ong; // Objeto que se llenará mediante el registro
  public voluntario: Voluntario; // Objeto que se llenará mediante el registro

  public contrasena: string; // Contraseña ingresada por el usuario
  public confirmContrasena: string; // Constraña de verificación ingresada por el usuario

  public opcAreas = []; // Secuencia de habilidades ingresadas por el usuario
  public areasConoc = AreasConocimiento; // Secuencia de areas de conocimiento ingresadas por el usuario

  public opcidiomas = []; // Secuencia de idiomas adicionales ingresadas por el usuario
  public idiomas = Idiomas; // Variable para el manejo del idioma en la lista despleglable

  public preview: string; // Variable temporal
  public telefonoNuevo = ''; // Variable para el manejo de nuevos telefonos
  public idiomaNuevo = ''; // Variable para el manejo de nuevos idiomas

  public habilidadNuevaNombre = ''; // Variable para el manejo de un nuevo nombro de habilidad
  public habilidadNuevaArea = ''; // Variable para el manejo de un nuevo nombre de un area de conocimiento

  public errorTelefonos = ''; // Variable para el manejo de errores al ingresar telefonos
  public errorIdiomas = ''; // Variable para el manejo de errores al ingresar Idiomas
  public errorArea = ''; // Variable para el manejo de errores al ingresar areas

  public fechaNacimiento: Date; // Variable para el manejo de fechas de nacimiento
  
  // Metodo constructor para crear un objeto del componente
  // Parámetros:
  // - authSvc: Objeto que permite el acceso al servicio de Autenticación y Registro
  // - router: Objeto que permite la navegación entre componentes por la URL
  constructor(private authSvc: AuthService, private router: Router) {}

  // Metodo que se ejecuta al iniciar el componente
  // Se inicializa el objeto Voluntario y Ong
  ngOnInit(): void {
    this.ong = new Ong();
    this.voluntario = new Voluntario();
    this.opcAreas = Object.keys(this.areasConoc);
    this.opcidiomas = Object.keys(this.idiomas);
  }

  // Metodo para consolidar el registro de un voluntario en la Base de datos
  async registrar() {
    if (this.contrasena === this.confirmContrasena) {
      this.voluntario.fechaNacimiento = this.fechaNacimiento;

      const result = await this.authSvc.registerVoluntario(
        this.voluntario,
        this.contrasena
      );
      console.log(result);
      if (result == null) {
        alert(
          "ERROR: Ya existe un usuario con ese correo, por favor ingrese otro"
        );
      } else {
        localStorage.setItem('uid', result.user.uid);
        localStorage.setItem('rol', 'voluntario');
        this.router.navigate(['/voluntario']);
      }
    } else {
      alert("ERROR: Las contraseñas no coinciden");
    }
  }

  // Metodo para guardar la imagen de perfil de la Ong y en la previsualización
  // Parametros:
  // - $event: Evento resultante de un input file que contiene la imagen
  uploadImage($event) {
    if ($event.target.files && $event.target.files[0]) {
      this.voluntario.imagenPerfil = $event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      };

      reader.readAsDataURL($event.target.files[0]);
    }
  }

  // Metodo para agregar un teléfono a la lista de teléfonos del Voluntario
  addTelefono() {
    if (this.telefonoNuevo !== "" && this.telefonoNuevo != null) {
      if (this.voluntario.telefonos.indexOf(this.telefonoNuevo) === -1) {
        const str = String(this.telefonoNuevo);
        if (!str.includes("-")) {
          this.voluntario.telefonos.push(this.telefonoNuevo);
          this.telefonoNuevo = "";
          this.errorTelefonos = "";
        } else {
          this.errorTelefonos = "Ingrese solo números";
        }
      } else {
        this.errorTelefonos =
          "El teléfono ya existe, ingrese un teléfono distinto";
      }
    } else {
      this.errorTelefonos = "Ingrese un teléfono";
    }
  }

  // Metodo para eliminar un télefono de la lista de télefonos del Voluntario
  deleteTelefono(tel: string) {
    const i = this.voluntario.telefonos.indexOf(tel);

    if (i !== -1) {
      this.voluntario.telefonos.splice(i, 1);
    }
  }

  // Metodo para agregar un idioma
  addIdioma() {
    if (this.idiomaNuevo !== '' && this.idiomaNuevo != null) {
      if (this.voluntario.idiomas.indexOf(this.idiomaNuevo) === -1) {
        this.voluntario.idiomas.push(this.idiomaNuevo);
        this.idiomaNuevo = '';
        this.errorIdiomas = '';
      } else {
        this.errorIdiomas = 'El idioma ya existe, ingrese uno distinto';
      }
    } else {
      this.errorIdiomas = 'Ingrese un idioma';
    }
  }

  // Metodo para eliminar un idioma agregado
  deleteIdioma(idiomaElimianr: string) {
    const i = this.voluntario.idiomas.indexOf(idiomaElimianr);

    if (i !== -1) {
      this.voluntario.idiomas.splice(i, 1);
    }
  }

  // Metodo para Agregar un area
  addArea() {
    if (this.habilidadNuevaNombre !== '' && this.habilidadNuevaNombre != null) {
      if (this.habilidadNuevaArea !== '' && this.habilidadNuevaArea != null) {
        const nuevaHabilidadPermanente = new Conocimiento();
        nuevaHabilidadPermanente.nombre = this.habilidadNuevaNombre;
        nuevaHabilidadPermanente.area = this.habilidadNuevaArea;
        if (
          this.voluntario.habilidades.indexOf(nuevaHabilidadPermanente) === -1
        ) {
          this.voluntario.habilidades.push(nuevaHabilidadPermanente);
          this.habilidadNuevaNombre = '';
          this.habilidadNuevaArea = '';
          this.errorArea = '';
        } else {
          this.errorArea = 'La habilidad ya existe, ingrese una distinta';
        }
      } else {
        this.errorArea = 'Ingrese una Area para la nueva habilidad';
      }
    } else {
      this.errorArea = 'Ingrese una un nombre para nueva la habilidad';
    }
  }

  // Metodo para eliminar un area
  deleteArea(areaEliminar: Conocimiento) {
    const i = this.voluntario.habilidades.indexOf(areaEliminar);

    if (i !== -1) {
      this.voluntario.habilidades.splice(i, 1);
    }
  }
}
