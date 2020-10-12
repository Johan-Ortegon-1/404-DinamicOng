import { Component, OnInit } from '@angular/core';
import { Voluntario } from '../../models/voluntario';
import { Ong } from '../../models/ong';
import { Solicitud } from '../../models/solicitud';
import { Iniciativa } from '../../models/iniciativa';



@Component({
  selector: 'app-ver-notificaciones',
  templateUrl: './ver-notificaciones.component.html',
  styleUrls: ['./ver-notificaciones.component.css']
})
export class VerNotificacionesComponent implements OnInit {

  constructor() { }

  public vol: Voluntario = new Voluntario();
  public ong1: Ong = new Ong() ;
  public ong2: Ong = new Ong();
  public solicitudes : Array<Solicitud> = [];
  public iniciativas:Array<Iniciativa>=[];

  public ini1:Iniciativa=new Iniciativa();
  public ini2:Iniciativa=new Iniciativa();
  public ini3:Iniciativa=new Iniciativa();
  
  public sol1: Solicitud =new Solicitud();
  public sol2: Solicitud =new Solicitud();
  public sol3: Solicitud =new Solicitud();

  primera='Hacer Helados por américa';
  segunda='Pray to the lord';
  tercera='Secar el mar';
   
  ngOnInit(): void {
    this.sol1.idOng="ong1";
    this.sol2.idOng="ong2";
    this.sol3.idOng="ong3";

    this.sol1.idIniciativa="a";
    this.sol1.aceptado=true;
    this.sol2.idIniciativa="b";
    this.sol2.aceptado=false;
    this.sol3.idIniciativa="c";
    this.sol3.aceptado=true;
    
    this.ini1.id="a";
    this.ini2.id="b";
    this.ini3.id="c";
    
    this.vol.participaciones=["a","b","c"]; //ids de sus participaciones(solicitudes)
    this.ong1.nombre="Reino de la tierra";
    this.ong2.nombre="Tribu del agua - sur";
    this.solicitudes.push(this.sol1,this.sol2,this.sol3);
    this.iniciativas.push(this.ini1,this.ini2,this.ini3);

    
   
    

  }

}
