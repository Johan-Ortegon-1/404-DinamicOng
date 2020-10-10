import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../../models/iniciativa';

@Component({
  selector: 'app-ver-iniciativas',
  templateUrl: './ver-iniciativas.component.html',
  styleUrls: ['./ver-iniciativas.component.css']
})
export class VerIniciativasComponent implements OnInit {

  constructor() { }
  public iniciativas : Array<Iniciativa> = [];
  public creadas= false;
  
  ini : Iniciativa = new Iniciativa ();
  ini2 : Iniciativa = new Iniciativa ();
  ini3 : Iniciativa = new Iniciativa ();
  
  

  ngOnInit(): void {
     this.ini.nombre="Mancos de america";
     this.ini2.nombre="Barriendo el desierto";
     this.ini3.nombre="La ezquina de la casa redonda";

     this.ini.imagenes=['imagen1','imagen2'];
     this.ini2.imagenes=['imagen3','imagen4'];
     this.ini3.imagenes=['imagen5','imagen6'];

     this.iniciativas.push(this.ini);
     this.iniciativas.push(this.ini2);
     this.iniciativas.push(this.ini3);

  }
  // back() {
  //   this.router.navigate(['/conductor/inicio-conductor']);
  // }
  

}
