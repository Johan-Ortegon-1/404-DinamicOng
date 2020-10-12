import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    /*
    if (localStorage.getItem('uid') != null) {
      if (localStorage.getItem('rol') == 'Ong') {
        this.router.navigate(['/ong']);
      } else if (localStorage.getItem('rol') == 'Voluntario') {
        this.router.navigate(['/voluntario']);
      }
    }
    */
  }

}
