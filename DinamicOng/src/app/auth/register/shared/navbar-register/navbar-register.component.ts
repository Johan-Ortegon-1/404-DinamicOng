import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-register',
  templateUrl: './navbar-register.component.html',
  styleUrls: ['./navbar-register.component.css']
})
export class NavbarRegisterComponent implements OnInit {

  public tipo: string = '';

  constructor(private route: Router) { }

  ngOnInit(): void {
    const ruta = this.route.url;
    console.log(ruta);
    if(ruta == '/register/ong') {
      this.tipo = 'ONG';
    }
  }

}
