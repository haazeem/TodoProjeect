import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  ConnexionForm: FormGroup;

  constructor(private t: Title, private form: FormBuilder, private router: Router, private _us: UserService, private toast: ToastrService) {
    this.ConnexionForm = this.form.group({
      email: new FormControl("", [
        Validators.email,
        Validators.required
      ]

      ),
      motDePasse: new FormControl("", [
        Validators.required
      ]
      )
    });
    this.t.setTitle("Connexion");
  }
  get email() {
    return this.ConnexionForm.get('email');
  }
  get motDePasse() {
    return this.ConnexionForm.get('motDePasse');
  }
  ngOnInit() {
    if (this._us.isLoggedUser()) {
      this.router.navigate(['/todo-rif']);
    } else if (this._us.isLoggedAsAdmin()) {
      this.router.navigate(['/adminPage']);
    }
  }

  connect() {
    let data = this.ConnexionForm.value;
    let user = new User("", "", "", data.email, data.motDePasse);
    this._us.userConnexion(user).subscribe((r) => {
    this.toast.success(' Connexion avec Succes ');
    localStorage.setItem('token', r.token);
     this.ngOnInit();
    }, (err) => {
      console.log(err);
      this.toast.error(err.error.msg);
    })
  }


}
