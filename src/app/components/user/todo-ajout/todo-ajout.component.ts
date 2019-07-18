import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-ajout',
  templateUrl: './todo-ajout.component.html',
  styleUrls: ['./todo-ajout.component.css']
})
export class TodoAjoutComponent implements OnInit {
  ajoutForm: FormGroup;
  constructor(private formAj: FormBuilder, private router : Router,private _todo: TodoService,private toast : ToastrService) {
    this.ajoutForm = this.formAj.group({
      titre: new FormControl("", [
        Validators.required,
        Validators.minLength(5)
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ])
    })

  }

  ngOnInit() {
  }
  get titre() {
    return this.ajoutForm.get('titre');
  }
  get description() {
    return this.ajoutForm.get('description');
  }


  ajoutTodo() {
    let data = this.ajoutForm.value;
    let token = localStorage.getItem('token');
    let ajout = new Todo(data.titre, data.description, token);
    console.log(ajout);
    this._todo.ajouterTodo(ajout).subscribe((r) => {
      this.toast.success('Ajout succes');
      this.router.navigateByUrl("/todo-rif");
    }, (err) => {
        this.toast.error(err.error.mesg);
      })
  }

}
