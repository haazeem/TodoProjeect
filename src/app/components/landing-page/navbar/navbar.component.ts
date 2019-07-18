import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isConnected: boolean;
  isAdmin: boolean;
  isInscrip: boolean;
  isHome: boolean;
  Url = "./../../assets/logo.png";
  constructor(private router: Router, private _user: UserService) { }

  ngOnInit() {
    this.isConnected = (!!localStorage.getItem('token'));
    this.isInscrip = (this.router.url === "/inscription") ? true : false;
    this.isHome = (this.router.url === "/home") ? true : false;
  }

  async deconnect() {
    await this._user.deconnected().subscribe((res) => {
    }, (err) => {
      console.log(err);
    });
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

}
