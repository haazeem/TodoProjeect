import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req, next) {
    if (localStorage.getItem('token') != null) {
      let tokenreq = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      })
      return next.handle(tokenreq);
    } else {
      return
    }

  }

}

