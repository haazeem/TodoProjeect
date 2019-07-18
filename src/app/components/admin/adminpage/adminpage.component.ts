import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  router: any;
  status = [];
  constructor(private toast: ToastrService, private _user: UserService) { }
  Nom: String;
  data = [];
  etat = [];
  coUsers: Number;
  nbUsers: Number;
  nbAdmins: Number;
  async ngOnInit() {

    localStorage.getItem('token');
    await this._user.infoDash().subscribe((res) => {
      this.coUsers = res['OnlineUsers'];
      this.nbUsers = res['users'];
      this.nbAdmins = res['Admins'];
      let d = res['data'];
      for (let i in d) {
        let da = d[i];
        for (let j in d[i]) {
          this.status.push(da[j]);
          if (da[j].role === "user") {

            this.data.push({ data: da[j], etat: da[j].isActivated });
          }
        }

      }
    }, (err) => {

    })
    this.Nom = "User 1 ";
    this.toast.info("Welcome !! ");
  }
  async deconnect() {
    await this._user.deconnected().subscribe((res) => {
    }, (err) => {
      console.log(err);
    });
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
  activate(data) {
    this._user.activate(data['data']).subscribe((res) => {
      this.toast.info("Activated")

    }, (err) => {
      this.toast.info("Erreur");
    });
    let index = this.data.indexOf(data);
    if (index != -1) {
      let d = this.data.splice(index, 1);
      this.data.push({ data: d[0]['data'], etat: true })
    }
  }
  desactivate(data) {
    this._user.desactivate(data['data']).subscribe((res) => {
      this.toast.info("Desactivated")
    }, (err) => {
      this.toast.info("Erreur");
    });
    let index = this.data.indexOf(data);
    if (index != -1) {
      let d = this.data.splice(index, 1);
      this.data.push({ data: d[0]['data'], etat: false })
    }
  }

}

