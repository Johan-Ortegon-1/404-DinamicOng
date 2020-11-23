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
}
