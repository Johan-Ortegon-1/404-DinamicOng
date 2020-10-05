import { Component, Input, OnInit } from '@angular/core';
import { Ong } from 'src/app/models/ong';
import { Ubicacion } from '../../../models/ubicacion';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-ong',
  templateUrl: './register-ong.component.html',
  styleUrls: ['./register-ong.component.css']
})
export class RegisterOngComponent implements OnInit {

  public nuevaOng = {
    nombre: "",
    correo: "",
    telefonos: [],
    mision: "",
    vision: "",
    pais: "",
    ciudad: "",
    direccion: ""
  };

  public contrasena;
  public confirmContrasena;

  constructor(private authSvc: AuthService) { }


  ngOnInit(): void {
  }

  onClick() {
    console.log(this.nuevaOng.nombre);
    if(this.contrasena == this.confirmContrasena)
    {
      let ong = new Ong("",this.nuevaOng.nombre, this.nuevaOng.correo, this.nuevaOng.telefonos,
      new Ubicacion(this.nuevaOng.ciudad, this.nuevaOng.pais, this.nuevaOng.direccion), this.nuevaOng.mision, this.nuevaOng.vision);


    }
  }

}
