import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserServicesService } from '../../services/user-services.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  ngOnInit() {
    if (this._us.isLoggedAsSuperAdmin()) {
      this.router.navigate(['/dashbord']);
    }
  }
  ConnexionForm: FormGroup;
  constructor(private t: Title, private form: FormBuilder, private router: Router, private _us: UserServicesService) {
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
  connect() {
    let data = this.ConnexionForm.value;
    let user = new User("", "", "", data.email, data.motDePasse);
    this._us.userConnexion(user).subscribe((r) => {
      localStorage.setItem('token', r.token);
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    })
  }

}
