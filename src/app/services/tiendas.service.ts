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
  constructor(public http: HttpClient) { }

  tiendas(numeroEmpleado: number): any {

    const url = this.urlService + '/tiendas/busquedas';
    let body  = {
      filtros:[],
      ha:222
    };
    return <Observable<any>>this.http.post(url,body);
  }


  categorias(): any {
    
    const url = this.urlService + '/tiendas/categorias';
    //const url = "https://api.bazappgs.com/superapp/elektra/transformacion-digital/gestion-tiendas/v1/tiendas/categorias"
    return this.http.get(url)
    /*  return from([1]).pipe(
        concatMap((id) => {
          return <Observable<any>>this.http.get(url, { headers: headers });
        })
      );*/
  }
}
