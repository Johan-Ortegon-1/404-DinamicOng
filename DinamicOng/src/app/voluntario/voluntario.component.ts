import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.component.html',
  styleUrls: ['./voluntario.component.css']
})
export class VoluntarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    /*
    if (localStorage.getItem('uid') == null) {
      this.router.navigate(['']);
    } else if (localStorage.getItem('rol') == 'Ong') {
      this.router.navigate(['/ong']);
    }
    */
  }

}
