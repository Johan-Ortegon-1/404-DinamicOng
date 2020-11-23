import { Component, OnInit } from "@angular/core";
import { Conocimiento } from "src/app/models/conocimiento";
import { Voluntario } from "src/app/models/voluntario";
import { VoluntarioService } from '../services/voluntario.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

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

    this.voluntarioServices.obtenerImagenPerfil(this.uid).then((url) => {
      this.voluntario.imagenPerfil = url;
    });

    this.voluntarioServices.consultarVoluntarioByID(this.uid).then((resp) => {
      this.voluntario = resp.data() as Voluntario;
      this.prueb = this.voluntario.nombre;
      this.conocimientos = this.voluntario.habilidades;
      this.idim = this.voluntario.idiomas;
      this.telefonos = this.voluntario.telefonos;

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
}
