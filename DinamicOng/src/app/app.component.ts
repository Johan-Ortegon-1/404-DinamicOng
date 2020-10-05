import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DinamicOng';

  //--------------------------------------------------
  // Variable para saber que rol está logeado
  //private rol: string = "voluntario";
  //private rol: string = "ong";
  private rol: string = "sin rol";
  //--------------------------------------------------

  // Constructor con la variable router para realizar la navegación mediante el rol
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.rol);
    if(this.rol == "voluntario") {
      this.router.navigate(['voluntario']);
    }
    else if(this.rol == "ong") {
      this.router.navigate(['ong']);
    }
    else {
      this.router.navigate(['home']);
    }

  }
}
