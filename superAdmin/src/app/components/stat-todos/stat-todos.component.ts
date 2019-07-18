import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../../services/user-services.service';


@Component({
  selector: 'app-stat-todos',
  templateUrl: './stat-todos.component.html',
  styleUrls: ['./stat-todos.component.scss']
})
export class StatTodosComponent implements OnInit {
  nbtodos: number;
  nbtodostoday: number;
  nbtodosmonthly: number;
  status = [];
  data = [];
  logs = [];

  constructor(private _user: UserServicesService) { }

  async ngOnInit() {
    await this._user.todosInfo().subscribe((res) => {
      console.log(res);
      this.data.push(res);
      this.logs.push(this.data['0']);
      this.nbtodos = this.data['0'].length;
      this.nbtodostoday = this.data['0'].todaytodos;
      this.nbtodosmonthly = this.data['0'].monthlytodos;
    }, (err) => {

    })
  }

}
