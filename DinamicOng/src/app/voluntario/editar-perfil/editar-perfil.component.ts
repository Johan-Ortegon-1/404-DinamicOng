import { Component, OnInit } from "@angular/core";
import { Conocimiento } from "src/app/models/conocimiento";
import { Voluntario } from "src/app/models/voluntario";
import { VoluntarioService } from '../services/voluntario.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Idiomas } from 'src/app/models/enumIdiomas';
import { AreasConocimiento } from 'src/app/models/enumAreasConocimiento';


@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.component.html",
  styleUrls: ["./editar-perfil.component.css"],
})
export class EditarPerfilComponent implements OnInit {
  public voluntario: Voluntario;
  public uid: string;
  //public conocimientos: Conocimiento[] = [];
  //public conocimiento: Conocimiento;
  public opcAreas = []; // Secuencia de habilidades ingresadas por el usuario
  public areasConoc = AreasConocimiento; // Secuencia de areas de conocimiento ingresadas por el usuario
  public habilidadNuevaNombre = ''; // Variable para el manejo de un nuevo nombro de habilidad
  public habilidadNuevaArea = ''; // Variable para el manejo de un nuevo nombre de un area de conocimiento
  public prueb: string;
  public idim: string[];
  public telefonos: string[];
  public nuevoTelefono = '';
  public errorTelefonos = '';
  public idiomaNuevo = '';
  public errorIdiomas = '';
  public idiomas = Idiomas;
  public preview: string;
  public b: boolean = false;
  public errorArea = '';
  public fechaNacimiento: Date; // Variable para el manejo de fechas de nacimiento


  constructor(
    private authSvc: AuthService,
    private voluntarioServices: VoluntarioService,
    private configC: NgbCarouselConfig,
    private router: Router
  ) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.voluntario = new Voluntario();
    this.uid = localStorage.getItem("uid");

    this.voluntarioServices.consultarVoluntarioByID(this.uid).then((resp) => {
      this.voluntario = resp.data() as Voluntario;
      this.prueb = this.voluntario.nombre;
      //this.conocimientos = this.voluntario.habilidades;
      this.opcAreas = Object.keys(this.areasConoc);
      this.idim = this.voluntario.idiomas;
      this.telefonos = this.voluntario.telefonos;
      this.idim = Object.keys(this.idiomas);

      this.voluntarioServices.obtenerImagenPerfil(this.uid).then((url) => {
        this.voluntario.imagenPerfil = url;
      });
    });
  }

  cancelar(): void {
    this.router.navigate(['/voluntario/mi-perfil']);
  }

  guardar(): void {
    this.router.navigate(['/voluntario/editar-perfil']);
  }
  async actualizar() {
    console.log('voluntario cambiado: ', this.voluntario);
    this.authSvc.updateVoluntario(this.voluntario, this.b);
    setTimeout(()=> {
      this.router.navigate(['/voluntario/mi-perfil']);
    }, 500);
  }
  deleteTelefono(tel: string) {
    const i = this.voluntario.telefonos.indexOf(tel);

    if (i !== -1) {
      this.voluntario.telefonos.splice(i, 1);
    }
  }
  addTelefono() {

    if (this.nuevoTelefono !== '' && this.nuevoTelefono != null) {

      if (this.voluntario.telefonos.indexOf(this.nuevoTelefono) == -1) {

        const str = String(this.nuevoTelefono);
        if (!str.includes('-')) {
          this.voluntario.telefonos.push(this.nuevoTelefono);
          this.nuevoTelefono = '';
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

  uploadImage($event) {

    if ($event.target.files && $event.target.files[0]) {

      this.voluntario.imagenPerfil = $event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      }
      this.b = true;

      reader.readAsDataURL($event.target.files[0]);
    }
    this.authSvc.updateImagenONG(this.voluntario);

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
