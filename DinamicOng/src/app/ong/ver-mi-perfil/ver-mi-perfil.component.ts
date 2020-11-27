import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OngService } from '../services/ong.service';
import { Ong } from 'src/app/models/ong';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-mi-perfil',
  templateUrl: './ver-mi-perfil.component.html',
  styleUrls: ['./ver-mi-perfil.component.css']
})
// Clase que representa el componente ver mi perfil de una Ong
export class VerMiPerfilComponent implements OnInit {

  public ong: Ong; // Objeto donde se almacena la Ong actual
  public uid: string; // String donde se almacena el id de la sesión
  public mision: string; // String donde se almacena la misión de la Ong
  public vision: string; // String donde se almacena la misión de la Ong
  public telefonos: string[]; // Arreglo donde se almacenan los teléfonos de la Ong
  constructor(private ongServices: OngService, private configC: NgbCarouselConfig, private router: Router) {
    configC.interval = 5000;
    configC.pauseOnHover = true;
  }
  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.ong = new Ong();
    this.uid = localStorage.getItem('uid');

    this.ongServices.consultarOngByID(this.uid).then(resp => {
      this.ong = resp.data() as Ong;

      this.mision = this.ong.mision;
      this.vision = this.ong.vision;
      this.telefonos = this.ong.telefonos;

      this.ongServices.obtenerImagenPerfil(this.uid).then(url => {
        this.ong.imagenPerfil = url;
      });
    });
  }
  // Método que lleva a la página de edición del perfil
  editarPerfil(): void {
    this.router.navigate(['/ong/editar-perfil']);
  }
}
