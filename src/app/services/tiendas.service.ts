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


  tiendas(filtros: any[],numeroRegistros:number = 30): any {
    const url = `${this.urlService}/tiendas/busquedas`;
    let body = {
      filtros,
      numeroRegistros
    };
    return <Observable<any>>this.http.post(url, body);
  }

  tiendasByPage(paginaSiguiente: string, filtros: any[],numeroRegistros:number): any {
    const url = `${this.urlService}/tiendas/busquedas`;
    let body = {
      filtros,
      numeroRegistros,
      paginaSiguiente,
    };
    return <Observable<any>>this.http.post(url, body);
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


  updateTienda(idTienda, categoria): any {

    const url = this.urlService + '/tiendas';
    let body = {
      idTienda,
      categoria
    }
    return this.http.put(url, body)
    /*  return from([1]).pipe(
        concatMap((id) => {
          return <Observable<any>>this.http.get(url, { headers: headers });
        })
      );*/
  }
}
