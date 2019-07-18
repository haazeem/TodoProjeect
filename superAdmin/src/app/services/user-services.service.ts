import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private _userConnexion = "http://localhost:3000/superadmin/connexion";
  private _information = "http://localhost:3000/superadmin/information"
  private _activate = "http://localhost:3000/superadmin/activate"
  private _desactivate = "http://localhost:3000/superadmin/desactivate";
  private _logsuser = "http://localhost:3000/superadmin/userlogs";
  private _infotodos="http://localhost:3000/superadmin/infotodos";
  private _deco = "http://localhost:3000/superadmin/deconnexion";
  constructor(private http: HttpClient) {
  }
  userConnexion(user: User) {
    return this.http.post<any>(this._userConnexion, user);
  }
  isLoggedAsSuperAdmin() {
    let token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodeToken = helper.decodeToken(token);
      if (decodeToken.role === "super") {
        return true;
      }
    }
    return false;
  }
  infoDash() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._information, null, options);
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
  userlogs() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._logsuser, null, options);
  }
  todosInfo(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._infotodos, null, options);
  }
  deconnecxion(){
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.post(this._deco,null,options);
  }

}
