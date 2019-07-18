import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { Todo } from '../../../models/todo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-modif',
  templateUrl: './todo-modif.component.html',
  styleUrls: ['./todo-modif.component.css']
})
export class TodoModifComponent implements OnInit {
  modifForm: FormGroup;
  title;
  Description;
  constructor(private form: FormBuilder, private _todo: TodoService, private r: Router, private toast: ToastrService) {
    this.modifForm = this.form.group({
      titre: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ])
    }
    )
  }

  ngOnInit() {
    let data = localStorage.getItem('Data');
    this.title = JSON.parse(data.toString()).titre;
    this.Description = JSON.parse(data.toString()).description;
  }
  get titre() {
    return this.modifForm.get('titre');
  }
  get description() {
    return this.modifForm.get('description');
  }

  Modifier() {
    let data = JSON.parse(localStorage.getItem('Data').toString());
    let todo = new Todo(this.titre.value, this.description.value, localStorage.getItem('token'), data.dateAjout, data.dateFin, data.etat);
    let Data = { oldtitre: data.titre, olddescription: data.description, data: todo }
    this._todo.modifTodo(Data).subscribe((res) => {
      this.toast.success("Updated with succes");
      localStorage.removeItem('Data');
      this.r.navigateByUrl("/todo-rif");
    }, (err) => {
      this.toast.error("Updated with error");
    });

  }
}
