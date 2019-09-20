import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  toggle = '';

  constructor(private router: Router, ) { }

  ngOnInit() {
  }

  /** Go to the appropriate route when login button is clicked. */
  route() {
    if (this.toggle) {
      this.router.navigate([this.toggle]);
    }
  }
}
