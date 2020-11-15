import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('uid')) {
      const rol = localStorage.getItem('rol');
      if (rol == 'Ong') {
        this.router.navigate(['/ong']);
      } else if (rol == 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }
    }
  }

}
