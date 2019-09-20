import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  toggle: string;

  constructor() { }

  ngOnInit() {
  }

  /** Show the appropriate login prompt when called from HTML template */
  showLogin(login: string) {
    this.toggle = login;
  }

}
