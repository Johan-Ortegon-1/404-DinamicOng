import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo-chat',
  templateUrl: './modulo-chat.component.html',
  styleUrls: ['./modulo-chat.component.css']
})
export class ModuloChatComponent implements OnInit {

  public select = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if ( this.router.url == '/voluntario/chat' || this.router.url == '/ong/chat') {
      this.select = false;
    } else {
      this.select = true;
    }

    this.router.events.subscribe(resp => {
      if ( this.router.url == '/voluntario/chat' || this.router.url == '/ong/chat') {
        this.select = false;
      } else {
        this.select = true;
      }
    });
  }

}
