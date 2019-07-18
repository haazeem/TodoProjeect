import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-rif',
  templateUrl: './todo-rif.component.html',
  styleUrls: ['./todo-rif.component.css']
})
export class TodoRifComponent implements OnInit {
  datefin = [];
  constructor(private t: Title, private r: Router, private _todo: TodoService, private _toast: ToastrService) {
    this.t.setTitle("Todo-liste");
  }

  todos = [];

  dones = [];

  ngOnInit() {
    let data = new Todo("", "");
    this._todo.listeTodo(data).subscribe((res) => {
      for (let i in res) {
        if (res[i].etat) {
          this.datefin.push(res[i].dateFin);
          this.dones.push(res[i])
        } else {
          this.todos.push(res[i])
        }
      }

    }, (err) => {
      console.log(err);
    })
    console.log();

  }
  RemoveData(T) {
    let data = new Todo(T.titre, T.description, "", T.dateAjout);
    console.log(data);
    this._todo.deleteTodo(data).subscribe((res) => {
      let index = this.todos.indexOf(Todo);
      let data = this.todos.splice(index, 1);
      this._toast.success('Deleted !');
    }, (err) => {
      this._toast.error("Nope you can't");

    });
  }
  delete(Todo) {
    this.RemoveData(Todo);
  }
  Modifier(Todo) {
    localStorage.setItem('Data', JSON.stringify(Todo));
    console.log(Todo);
    this.r.navigateByUrl('/todo-modif');
  }
  terminate(T) {
    let d = new Date();
    let token = localStorage.getItem('token');
    let data = new Todo(T.titre, T.description, token, T.dateAjout, d);
    this._todo.terminateTodo(data).subscribe((res) => {
      this._toast.success("Terminated ! ");
      let index = this.todos.indexOf(Todo);
      this.todos.splice(index, 1);
      this.datefin.push(d.toLocaleDateString());
      this.dones.push(Todo);
    }, (err) => {
      this._toast.error("Nope u can't");
    });

  }
  deleteFromDones(T) {
    let index = this.dones.indexOf(T);
    let data = this.dones.splice(index, 1);
    this.dones.push(data[0])
    let Data = new Todo(data[0].titre, data[0].description, "", data[0].dateAjout);
    console.log(Data);
    this._todo.deleteTodo(Data).subscribe((res) => {
      this._toast.success("Deleted ! ");
      this.dones.splice(index, 1);
    }, (err) => {
      this._toast.error("Nope u can't");
    });

  }


}
