import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  private urlService = environment.ws;
  constructor(public http: HttpClient) {
  }

  tiendas(numeroEmpleado:number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    const url = this.urlService + '/asesores/'+numeroEmpleado;
    return this.http.get(url,{headers});
  }

  

}
