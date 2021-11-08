import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { ResponseServer } from 'src/app/models/responseServer.model';
import { TiendaReducer } from 'src/app/models/tiendaReducer.model';
import { tiendasFilter } from 'src/app/schemas/tiendas';
import { AuthService } from 'src/app/services/auth.service';
import { Cypher } from 'src/app/services/encrypt.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { environment } from 'src/environments/environment';
import { Tienda } from '../../models/tienda.model';
import { AgregarTiendaActions } from '../tienda.actions';

@Component({
  selector: 'list-tiendas',
  templateUrl: './list-tiendas.component.html',
  styleUrls: ['./list-tiendas.component.scss']
})
export class ListTiendasComponent implements OnInit {

  tiendas: Tienda[];
  showButton = false;
  private paginaAux = null;
  private scrollHeight = 500;
  private host = environment.hostImagenes;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<AppState>, private tiendasService: TiendasService,
  private cypher: Cypher,private authService: AuthService) { }

  ngOnInit(): void {
    this.store.select('tiendasReducer').pipe(takeUntil(this.destroy$)).subscribe((tiendaReducer: TiendaReducer) => this.tiendas = tiendaReducer.tiendas);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    //  Numero de pixeles desplazados
    const yOffSet = window.pageXOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    let paginaSiguiente = localStorage.getItem('paginaSiguiente');
    let filtro = JSON.parse(localStorage.getItem('filtro'));
    let numeroRegistros: any = localStorage.getItem('numeroRegistros');
    numeroRegistros ? numeroRegistros = parseInt(numeroRegistros) : numeroRegistros = 30;
    if (!paginaSiguiente)
        return
    if(this.paginaAux == paginaSiguiente)
      return
    this.paginaAux = paginaSiguiente;
    this.tiendasService.tiendasByPage(paginaSiguiente, filtro,numeroRegistros).pipe(
      map((response: ResponseServer) => {
        if (response.codigo ==
          '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000') {
          response.resultado.paginaSiguiente ? localStorage.setItem('paginaSiguiente', response.resultado.paginaSiguiente) : localStorage.removeItem('paginaSiguiente');
          return response.resultado.tiendas
        } else {
          return [];
        }
      },
      ),
      finalize(() => this.paginaAux = null),
    ).subscribe(async (tiendas: Tienda[]) => {
        let decript = { tiendas: tiendas };
        await this.cypher.doFinal(tiendasFilter, decript, this.cypher.decrypt);
        this.tiendas = decript.tiendas;
        this.tiendas.forEach((tienda: Tienda) => {
          if (!tienda.logo || !tienda.logo.referencia) tienda.host = null;
          else tienda.host = this.host + tienda.logo.referencia;
          if (tienda.direccion) {
            tienda.localizacion = `${tienda.direccion.calle}, ${tienda.direccion.colonia}, ${tienda.direccion.municipio}, ${tienda.direccion.codigoPostal}, ${tienda.direccion.entidadFederativa}`;
          } else {
            tienda.localizacion = '';
            tienda.zonasTrabajo.forEach((zona: any) => {
              tienda.localizacion = tienda.localizacion + ', ' + zona.nombre;
            });
            tienda.localizacion = tienda.localizacion.slice(2, tienda.localizacion.length)
          };
          const agregarTiendaActions = new AgregarTiendaActions(tienda);
          this.store.dispatch(agregarTiendaActions);
        });
      }, (err: { status: number; }) => {
        if (err.status == 401 || err.status == 403) {
          this.authService.signOut();
        }
      });

  }
}
