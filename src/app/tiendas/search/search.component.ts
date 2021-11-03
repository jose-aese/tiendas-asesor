import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/services/tiendas.service';
import { map } from 'rxjs/operators';
import { Tienda } from '../../models/tienda.model';
import { ResponseServer } from 'src/app/models/responseServer.model';
import { AgregarTiendaActions, BorrarTiendaActions } from '../tienda.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Cypher } from 'src/app/services/encrypt.service';
import { tiendasFilter } from '../../schemas/tiendas';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private host = environment.hostImagenes;
  empleado = {
    num: null,
  };
  numSeleccionado: number;
  tiendas: any;

  constructor(
    private tiendasService: TiendasService,
    private store: Store<AppState>,
    private cypher: Cypher,
    private authService: AuthService

  ) { }

  async ngOnInit() {
  }

  seleccionaEmpleado() {
    const accion = new BorrarTiendaActions();
    this.store.dispatch(accion);
    this.numSeleccionado = this.empleado.num;
    this.tiendasService
      .tiendas(this.numSeleccionado)
      .pipe(
        map((response: ResponseServer) =>
          response.codigo ==
            '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000'
            ? response.resultado.tiendas
            : []
        )
      )
      .subscribe(async (tiendas: Tienda[]) => {
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
          }
          const accion = new AgregarTiendaActions(tienda);
          this.store.dispatch(accion);
        });
      }, (err: { status: number; }) => {
        if (err.status == 401 || err.status == 403) {
          this.authService.signOut();
        }
      });
  }
}
