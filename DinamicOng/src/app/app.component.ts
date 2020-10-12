import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DinamicOng';

  // Constructor con la variable router para realizar la navegación mediante el rol
  constructor(private router: Router) {}

  ngOnInit(): void {

    this.router.navigate(['/login']);
    /*
    if (localStorage.getItem('uid') != null) {
      if (localStorage.getItem('rol') == 'Ong') {
        this.router.navigate(['/ong']);
      } else if (localStorage.getItem('rol') == 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }
    }*/
  }
}
