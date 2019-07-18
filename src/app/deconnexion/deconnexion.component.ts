import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {

  constructor(private router: Router, private _user: UserService) { }

  ngOnInit() {
    localStorage.removeItem('login');
    localStorage.removeItem('connect');
    localStorage.removeItem('inscri');
    localStorage.removeItem('Admin');
    this.router.navigateByUrl('/home');
    this._user.deconnected().subscribe((res) => {

    }, (err) => {

    });
    localStorage.removeItem('token');
  }

}
