import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Spiner } from '../services/spiner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private spiner: Spiner,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // let token = localStorage.getItem('usrtkn');  
    // let tokenUsuario = localStorage.getItem('username');   
    // console.log(token)  
    // let sicu = null

    const reqClone = this.validacionMetodo(request);
    return next.handle(reqClone)
      .pipe(finalize(() => this.spiner.close()));
  }


  private validacionMetodo(request: HttpRequest<any>,) {
    let token = localStorage.getItem('usrtkn');
    let tokenUsuario = localStorage.getItem('username');
    console.log(token)
    let sicu = null;
    switch (request.method) {
      case `PUT`:
        sicu = localStorage.getItem('sicu');
      default:
        sicu = "66666666666666666666666666666666";
    }
    let requestClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        "x-sicu": sicu,
        "x-token-usuario": tokenUsuario,
        'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
        "x-idacceso": sicu
      }
    });

    return requestClone;
  }
}