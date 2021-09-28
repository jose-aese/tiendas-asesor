import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  private urlService = environment.ws;
  constructor(public http: HttpClient) {}

  tiendas(numeroEmpleado: number): any {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const url = this.urlService + '/asesores/' + numeroEmpleado;

    return from([1]).pipe(
      concatMap((id) => {
        return <Observable<any>>this.http.get(url, { headers });
      })
    );
  }
}
