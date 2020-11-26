import { Component, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { OngService } from '../services/ong.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  public ong: Ong;
  public uid: string;
  public mision: string;
  public vision: string;
  public telefonos: string[];
  public nuevoTelefono = 'Nuevo telefono';
   public errorTelefonos = '';
   public preview: string;
   public b :boolean=false;
  
  constructor(private authSvc: AuthService, private ongServices: OngService, private configC: NgbCarouselConfig, private router: Router) { 
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.ong = new Ong();
    this.uid = localStorage.getItem('uid');

    this.ongServices.consultarOngByID(this.uid).then(resp=>{
    this.ong = resp.data() as Ong;

    this.mision= this.ong.mision;
    this.vision= this.ong.vision;
    this.telefonos = this.ong.telefonos;
    
    

    this.ongServices.obtenerImagenPerfil(this.uid).then(url => {
      this.ong.imagenPerfil = url;
    });

    });
  }

  editarPerfil(): void
  {
    this.router.navigate(['/ong/editar-perfil']);
  }

  cancelar(): void
  {
    this.router.navigate(['/ong/ver-perfil']);
  }
  
  async actualizar()
  {
    console.log("ong cambiada: ", this.ong);
    this.authSvc.updateOng(this.ong);
    this.router.navigate(['/ong/ver-perfil']);
  }
  addTelefono() {

    if (this.nuevoTelefono !== '' && this.nuevoTelefono != null) {

      if (this.ong.telefonos.indexOf(this.nuevoTelefono) == -1) {

        const str  = String(this.nuevoTelefono);
        if (!str.includes('-')) {
          this.ong.telefonos.push(this.nuevoTelefono);
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
  deleteTelefono(tel: string) {
    const i = this.ong.telefonos.indexOf( tel );

    if ( i !== -1 ) {
      this.ong.telefonos.splice( i, 1 );
    }
}
uploadImage($event) {

  if ($event.target.files && $event.target.files[0]) {

    this.ong.imagenPerfil = $event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.preview = event.target.result;
    }
    this.b=true;

    reader.readAsDataURL($event.target.files[0]);
  }
}


}
