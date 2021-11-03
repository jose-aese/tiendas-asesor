import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  private urlService = environment.ws;
  constructor(public http: HttpClient) { }

  tiendas(numeroEmpleado: number): any {
  //  const url = `${this.urlService}/tiendas/busquedas`;
   const url = `${this.urlService}/tiendas/ubicaciones?codigoPostal=${numeroEmpleado}`;
    let body  = {
      filtros:[],
      ha:222
    };
    // return <Observable<any>>this.http.post(url,body);
    return <Observable<any>>this.http.get(url);
  }


  categorias(): any {
    
    const url = this.urlService + '/tiendas/categorias';
    return this.http.get(url)
    /*  return from([1]).pipe(
        concatMap((id) => {
          return <Observable<any>>this.http.get(url, { headers: headers });
        })
      );*/
  }


  updateTienda(idTienda,categoria): any {
    
    const url = this.urlService + '/tiendas';
    let body = {
      idTienda,
      categoria
    }
    return this.http.put(url,body)
    /*  return from([1]).pipe(
        concatMap((id) => {
          return <Observable<any>>this.http.get(url, { headers: headers });
        })
      );*/
  }
}
