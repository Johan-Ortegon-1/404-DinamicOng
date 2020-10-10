import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { Voluntario } from 'src/app/models/voluntario';
import { Conocimiento } from 'src/app/models/conocimiento';
import { AuthService } from '../../services/auth.service';
import { IdiomasDisponibles } from '../../../models/idiomas';
import { AreasConocimientoDisponibles } from '../../../models/areasConocimiento';
import { AreasConocimiento } from '../../../models/enumAreasConocimiento';

@Component({
  selector: 'app-register-voluntario',
  templateUrl: './register-voluntario.component.html',
  styleUrls: ['./register-voluntario.component.css']
})
export class RegisterVoluntarioComponent implements OnInit {

  public ong: Ong;
  public voluntario: Voluntario;

  public contrasena: string;
  public confirmContrasena: string;

  public preview: string;
  public telefonoNuevo = '';
  public errorTelefonos = '';
  public idiomas: IdiomasDisponibles = new IdiomasDisponibles();
  public areasConocimiento: AreasConocimientoDisponibles = new AreasConocimientoDisponibles();
  public misIdiomas: string[];
  public misAreasConocimiento: string[];

  public idioma1: string;
  public idioma2: string;
  public idioma3: string;

  public nombreHabilidad1: string;
  public nombreHabilidad2: string;
  public nombreHabilidad3: string;

  public habilidad1: Conocimiento = new Conocimiento();
  public habilidad2: Conocimiento = new Conocimiento();
  public habilidad3: Conocimiento = new Conocimiento();

  public fechaNacimiento: Date;


  constructor(private authSvc: AuthService) { }


  ngOnInit(): void {
    this.ong = new Ong();
    this.voluntario = new Voluntario();
    this.misIdiomas = this.idiomas.idiomas;
    this.misAreasConocimiento = this.areasConocimiento.areasConocimeinto;
  }

  async registrar() {
    if (this.contrasena === this.confirmContrasena) {
      console.log('Bandera ' + this.nombreHabilidad1);
      this.voluntario.fechaNacimiento = this.fechaNacimiento;
      /*this.voluntario.idiomas.push(this.idioma1);
      this.voluntario.idiomas.push(this.idioma2);
      this.voluntario.idiomas.push(this.idioma3);*/

      this.habilidad1.nombre = this.nombreHabilidad1;
      this.habilidad2.nombre = this.nombreHabilidad2;
      this.habilidad3.nombre = this.nombreHabilidad3;

      this.habilidad1.certificado = false;
      this.habilidad2.certificado = false;
      this.habilidad3.certificado = false;

      this.habilidad1.imagenCertificado = '';
      this.habilidad2.imagenCertificado = '';
      this.habilidad3.imagenCertificado = '';

      this.voluntario.areasDeConocimiento.push(this.habilidad1);
      this.voluntario.areasDeConocimiento.push(this.habilidad2);
      this.voluntario.areasDeConocimiento.push(this.habilidad3);

      const result = (await this.authSvc.registerVoluntario(this.voluntario, this.contrasena));
      console.log(result);
      if (result == null)
      {
        alert('ERROR: Ya existe un usuario con ese correo, por favor ingrese otro');
      } else {
        // Avanzar a la pantalla de la Voluntario
      }
    } else {
      alert('ERROR: Las contraseñas no coinciden');
    }
  }

  uploadImage($event) {

    if ($event.target.files && $event.target.files[0]) {

      //this.ong.imagenPerfil = $event.target.files[0];
      this.voluntario.imagenPerfil = $event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.preview = event.target.result;
      }

      reader.readAsDataURL($event.target.files[0]);
    }
  }

  addTelefono() {

    if (this.telefonoNuevo !== '' && this.telefonoNuevo != null) {

      if (this.voluntario.telefonos.indexOf(this.telefonoNuevo) === -1) {

        const str  = String(this.telefonoNuevo);
        if (!str.includes('-')) {
          this.voluntario.telefonos.push(this.telefonoNuevo);
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
    const i = this.voluntario.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.voluntario.telefonos.splice( i, 1 );
    }
  }

  subirCertificado(){
    
  }

}
