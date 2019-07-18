import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userInscription = "http://localhost:3000/user/inscription";
  private _userConnexion = "http://localhost:3000/user/connexion";
  private _activate = "http://localhost:3000/admin/activate"
  private _desactivate = "http://localhost:3000/admin/desactivate";
  private _setdeConnected = "http://localhost:3000/user/deconnexion"
  private _infoDashbord = "http://localhost:3000/admin/information";
  constructor(private http: HttpClient) { }

  userInscription(user: User) {
    return this.http.post<any>(this._userInscription, user);
  }

  userConnexion(user: User) {
    return this.http.post<any>(this._userConnexion, user);
  }
  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }
  isLoggedUser() {
    let token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const helper = new JwtHelperService();
      const decodToken = helper.decodeToken(token);
      if (decodToken.role === "user") {
        return true;
      }
    }
    return false;
  }
  isLoggedAsAdmin() {
    let token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      if (decodeToken.role === "admin") {
        return true;
      }
    }
    return false;
  }
  deconnected() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._setdeConnected, null, options);
  }
  infoDash() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._infoDashbord, null, options);
  }
  activate(data) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._activate, data, options);
  }
  desactivate(data) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._desactivate, data, options);
  }

}
