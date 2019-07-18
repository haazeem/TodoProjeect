import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.scss']
})
export class GestionUsersComponent implements OnInit {
  coUsers
  nbUsers
  nbAdmins
  data = [];
  status = [];
  interval;
  isCollapsed: boolean = false;
  constructor(private _user: UserServicesService) {
    this.infoDashboard();
  }
  routerOnActivate() {
    this.interval = setInterval(() => {
      this.infoDashboard(); // api call
    }, 100);
  }

  routerOnDeactivate() {
    clearInterval(this.interval);
  }

  async infoDashboard() {
    await this._user.infoDash().subscribe((res) => {
      this.coUsers = res['OnlineUsers'];
      this.nbUsers = res['users'];
      this.nbAdmins = res['Admins'];
      let d = res['data'];
      for (let i in d) {
        let da = d[i];
        for (let j in d[i]) {
          this.status.push(da[j]);
          if (da[j].role !== "super") {
            this.data.push({ data: da[j], etat: da[j].isActivated });
          }
        }

      }
    }, (err) => {

    })
  }
  async ngOnInit() {

  }
  activate(data) {
    this._user.activate(data['data']).subscribe((res) => {


    }, (err) => {

    });
    let index = this.data.indexOf(data);
    if (index != -1) {
      let d = this.data.splice(index, 1);
      this.data.push({ data: d[0]['data'], etat: true })
    }
  }
  desactivate(data) {
    this._user.desactivate(data['data']).subscribe((res) => {

    }, (err) => {

    });
    let index = this.data.indexOf(data);
    if (index != -1) {
      let d = this.data.splice(index, 1);
      this.data.push({ data: d[0]['data'], etat: false })
    }
  }
  

  collapsed(event: any): void {
    console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

}
