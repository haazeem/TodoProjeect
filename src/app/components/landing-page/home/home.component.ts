import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private t: Title) {
    this.t.setTitle("Home");
  }

  ngOnInit() {

    if (localStorage.getItem('login') == null) {
      localStorage.removeItem('connect');
      localStorage.removeItem('inscri');
      localStorage.setItem('home', 'in');
    }

  }

}
