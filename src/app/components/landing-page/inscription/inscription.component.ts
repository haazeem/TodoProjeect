import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/user';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  subscribeForm: FormGroup;

  constructor(private router: Router, private t: Title, private fb: FormBuilder, private _us: UserService, private toast: ToastrService) {
    this.t.setTitle("Inscription");

    this.subscribeForm = fb.group(
      {
        nom: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z]+")
        ]),
        prenom: new FormControl("", [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z]+")
        ]),
        telephone: new FormControl("", [
          Validators.maxLength(13),
          Validators.minLength(8),
          Validators.pattern("[1-9][1-9][1-9][1-9][1-9][1-9][1-9][1-9]+"),
          Validators.required,
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.pattern("[a-zA-Z][a-zA-Z]+@[a-zA-Z][a-zA-Z][a-zA-Z]+[.][a-zA-Z][a-zA-Z][a-zA-Z]+")
        ]
        ),
        motDePasse: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ]),
        repMotDePasse: new FormControl("", [
          Validators.required
        ])
      }
    );

  }
  get nom() {
    return this.subscribeForm.get('nom');
  }
  get prenom() {
    return this.subscribeForm.get('prenom');
  }
  get telephone() {
    return this.subscribeForm.get('telephone');
  }
  get email() {
    return this.subscribeForm.get('email');
  }
  get motDePasse() {
    return this.subscribeForm.get('motDePasse');
  }

  get repMotDePasse() {
    return this.subscribeForm.get('repMotDePasse');
  }

  ngOnInit() {
    if (this._us.isLoggedUser()) {
      this.router.navigate(['/todo-rif']);
    } else if (this._us.isLoggedAsAdmin()) {
      this.router.navigate(['/adminPage']);
    }
  }
  Inscription() {
    //console.log(this.subscribeForm.value);
    let data = this.subscribeForm.value;
    let user = new User(data.nom, data.prenom, data.telephone, data.email, data.motDePasse, false);
    console.log(user);
    this._us.userInscription(user).subscribe((r) => {
      console.log(r);
      this.toast.success(' Inscription avec Succes ');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000)
    }, (err) => {
      console.log(err);
      this.toast.error('Inscription erroné !! ');
    })

  }

}
