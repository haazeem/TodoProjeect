import { Component, OnInit } from '@angular/core';

import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-stat-users',
  templateUrl: './stat-users.component.html',
  styleUrls: ['./stat-users.component.scss']
})
export class StatUsersComponent implements OnInit {
  coUsers: number;
  nbUsers: number;
  nbAdmins: number;
  status = [];
  data = [];
  logs = [];

  constructor(private _user: UserServicesService) { }
  public pieChartLabels: string[] = ['Admins', 'Users'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  async ngOnInit() {
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
      this.pieChartData.push(Math.round((this.nbAdmins * 100) / (this.nbUsers + this.nbAdmins)));
      this.pieChartData.push(Math.round((this.nbUsers * 100) / (this.nbUsers + this.nbAdmins)));

    }, (err) => {

    })
    await this._user.userlogs().subscribe((res) => {
      for (let i in res) {
        this.logs.push(res[i])
      }
    }, (err) => {

    })
  }

}
