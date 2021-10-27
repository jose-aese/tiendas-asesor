import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log(request);
      
    request = request.clone({
     
        setHeaders: {
        //Authorization: `Bearer ${this.auth.getToken()}`
        //Authorization: `Bearer hahahahahaaahah}`,
        //'Content-Type': 'application/x-www-form-urlencoded',
        "accept": "*/*",
        
        "cache-control": "no-cache",
        
        
        "content-type": "application/json",
        
        "postman-token": "2cd224c5-2477-4f30-b147-cf8a8324efdc",
        
        "x-amzn-trace-id": "Root=1-6178b1fd-374a62827d0044fc5c0069c7",
        "x-forwarded-for": "54.86.50.139",
        "x-forwarded-port": "80",
        "x-forwarded-proto": "http",
        "x-id-interaccion": "123e4567-e89b-12d3-a456-426655440000",
        "x-idacceso": "3bad1290ac4600a569162efaa09117ea",
        "x-sicu": "3bad1290ac4600a569162efaa09117ea",
        "x-token-usuario": "SRfVZrTYvdm7mzzZmcuiDViACkAx"
        //'Content-Type': 'application/json',
        //'Authorization': `Bearer ${auth_token}`,
        /*'x-sicu': '3bad1290ac4600a569162efaa09117ea',
        'x-id-interaccion': '123e4567-e89b-12d3-a456-426655440000',
        'x-nombre-dispositivo': 'Super movil',
        'x-id-dispositivo': '3bad1290ac4600a569162efaa09117ea',
        'x-sistema-dispositivo': 'Android',
        'x-version-dispositivo': '6.0',
        'x-version-aplicacion': '2.1.1',
        'x-modelo-dispositivo': 'P40',
        'x-fabricante-dispositivo': 'Huawei',
        /*
        'x-serie-procesador': 'mt6735',
        'x-operador-telefonia': 'Telcel',
        'x-latitud': '19.49781290',
        'x-longitud': '- 99.12698712',
        'x-token-usuario': 'SRfVZrTYvdm7mzzZmcuiDViACkAx',
        'x-aplicacion': 'postma',
        */
        //'Access-Control-Allow-Origin':'http://localhost:4200',
        //'Access-Control-Allow-Credentials': 'true' 
      }
    
    });

    console.log(request)

    return next.handle(request);
  }
}