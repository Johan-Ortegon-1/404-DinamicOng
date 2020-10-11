import { Component, Input, OnInit } from "@angular/core";
import { Ong } from "src/app/models/ong";
import { Voluntario } from "src/app/models/voluntario";
import { Conocimiento } from "src/app/models/conocimiento";
import { AuthService } from "../../services/auth.service";
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';
import { Idiomas } from 'src/app/models/enumIdiomas';

@Component({
  selector: "app-register-voluntario",
  templateUrl: "./register-voluntario.component.html",
  styleUrls: ["./register-voluntario.component.css"],
})
export class RegisterVoluntarioComponent implements OnInit {
  public ong: Ong;
  public voluntario: Voluntario;

  public contrasena: string;
  public confirmContrasena: string;

  public opcAreas = [];
  public areasConoc = AreasConocimiento;

  public opcidiomas = [];
  public idiomas = Idiomas;

  public preview: string;
  public telefonoNuevo = '';
  public idiomaNuevo = '';

  public habilidadNuevaNombre = '';
  public habilidadNuevaArea = '';

  public errorTelefonos = '';
  public errorIdiomas = '';
  public errorArea = '';

  public fechaNacimiento: Date;

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.ong = new Ong();
    this.voluntario = new Voluntario();
    this.opcAreas = Object.keys(this.areasConoc);
    this.opcidiomas = Object.keys(this.idiomas);
  }

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
        // Avanzar a la pantalla de la Voluntario
      }
    } else {
      alert("ERROR: Las contraseñas no coinciden");
    }
  }

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

  deleteTelefono(tel: string) {
    const i = this.voluntario.telefonos.indexOf(tel);

    if (i !== -1) {
      this.voluntario.telefonos.splice(i, 1);
    }
  }

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

  deleteIdioma(idiomaElimianr: string) {
    const i = this.voluntario.idiomas.indexOf(idiomaElimianr);

    if (i !== -1) {
      this.voluntario.idiomas.splice(i, 1);
    }
  }

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

  deleteArea(areaEliminar: Conocimiento) {
    const i = this.voluntario.habilidades.indexOf(areaEliminar);

    if (i !== -1) {
      this.voluntario.habilidades.splice(i, 1);
    }
  }
}
