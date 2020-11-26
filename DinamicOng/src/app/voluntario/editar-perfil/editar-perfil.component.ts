import { Component, OnInit } from "@angular/core";
import { Conocimiento } from "src/app/models/conocimiento";
import { Voluntario } from "src/app/models/voluntario";
import { VoluntarioService } from '../services/voluntario.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Idiomas } from 'src/app/models/enumIdiomas';


@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.component.html",
  styleUrls: ["./editar-perfil.component.css"],
})
export class EditarPerfilComponent implements OnInit {
  public voluntario: Voluntario;
  public uid: string;
  public conocimientos: Conocimiento[] = [];
  public conocimiento: Conocimiento;
  public prueb: string;
  public idim: string[];
  public telefonos: string[];
  public nuevoTelefono = 'Nuevo telefono';
  public errorTelefonos = '';
  public idiomaNuevo = '';
  public errorIdiomas = '';
  public idiomas = Idiomas;
  public i =0;



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
      this.conocimientos = this.voluntario.habilidades;
      this.idim = this.voluntario.idiomas;
      this.telefonos = this.voluntario.telefonos;
      this.idim = Object.keys(this.idiomas);

      this.voluntarioServices.obtenerImagenPerfil(this.uid).then((url) => {
        this.voluntario.imagenPerfil = url;
      });
    });
  }

  cancelar(): void
  {
    this.router.navigate(['/voluntario/mi-perfil']);
  }

  guardar(): void
  {
    this.router.navigate(['/voluntario/editar-perfil']);
  }
  async actualizar()
  {
    console.log('voluntario cambiado: ', this.voluntario);
    this.authSvc.updateVoluntario(this.voluntario);
    this.router.navigate(['/voluntario/mi-perfil']);
  }
  deleteTelefono(tel: string) {
    const i = this.voluntario.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.voluntario.telefonos.splice( i, 1 );
    }
}
addTelefono() {

  if (this.nuevoTelefono !== '' && this.nuevoTelefono != null) {

    if (this.voluntario.telefonos.indexOf(this.nuevoTelefono) == -1) {

      const str  = String(this.nuevoTelefono);
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
  this.i=this.i+1;
  if (this.idiomaNuevo !== '' && this.idiomaNuevo != null&& this.i >= 1) {
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


}
