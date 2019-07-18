import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _ajoutTodo = "http://localhost:3000/todo/todo-ajout";
  private _listeTodo = "http://localhost:3000/todo/todo-liste";
  private _terminateTodo = "http://localhost:3000/todo/todo-termiate";
  private _deleteTodo = "http://localhost:3000/todo/todo-supp";
  private _modifTodo = "http://localhost:3000/todo/todo-modif";

  constructor(private http: HttpClient) { }

  ajouterTodo(Todo: Todo) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._ajoutTodo, Todo, options);
  }
  listeTodo(TodoM: Todo) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._listeTodo, TodoM, options);
  }
  terminateTodo(TodoT: Todo) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._terminateTodo, TodoT, options);
  }
  deleteTodo(TodoD: Todo) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._deleteTodo, TodoD, options);
  }
  modifTodo(Todoo) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._modifTodo, Todoo, options);
  }


}
