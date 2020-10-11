import { Component, OnInit } from '@angular/core';
import { Ong } from '../../models/ong';
import { Iniciativa } from '../../models/iniciativa';

@Component({
  selector: 'app-administrar-voluntarios',
  templateUrl: './administrar-voluntarios.component.html',
  styleUrls: ['./administrar-voluntarios.component.css']
})
export class AdministrarVoluntariosComponent implements OnInit {

  constructor() { }
  public iniciativas : Array<Iniciativa> = [];
  public voluntarios:Array<String>=[];
  ini1= new Iniciativa ();
  ini2= new Iniciativa ();
  ini3= new Iniciativa ();
  vol11= "pepe";
  vol12="pedro";
  vol21="maria";
  vol31="daniela";

  ngOnInit(): void {
    this.ini1.nombre='Enseñar';
    this.ini2.nombre='Manquitos';
    this.ini3.nombre='Merge';
    this.ini1.participantes=[this.vol11,this.vol12];
    this.ini2.participantes=[this.vol21];
    this.ini3.participantes=[this.vol31];
    this.iniciativas.push(this.ini1,this.ini2,this.ini3);
    
  }

}
