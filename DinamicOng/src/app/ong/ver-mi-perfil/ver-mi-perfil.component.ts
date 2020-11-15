import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OngService } from '../services/ong.service';
import { Ong } from 'src/app/models/ong';

@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
export class VerMiPerfilComponent implements OnInit {

  public ong: Ong;
  public uid: string;
  public mision: string;
  public vision: string;
  public telefonos: string[];
  constructor(private ongServices: OngService, private configC: NgbCarouselConfig) {
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

}
