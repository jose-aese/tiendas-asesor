import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/services/tiendas.service';
import { map } from 'rxjs/operators';
import { Tienda } from '../../models/tienda.model';
import { ResponseServer } from 'src/app/models/responseServer.model';
import { AgregarTiendaActions } from '../tienda.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  empleado = {
    num: 1026882,
  };
  numSeleccionado: number;
  tiendas: any;
  host = 'https://minegocio.bazappgs.com/';
  constructor(
    private tiendasService: TiendasService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  seleccionaEmpleado() {
    this.numSeleccionado = this.empleado.num;
    this.tiendasService
      .tiendas(this.numSeleccionado)
      .pipe(
        map((response: ResponseServer) =>
          response.codigo ==
          '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000'
            ? response.resultado
            : []
        )
      )
      .subscribe((tiendas: Tienda[]) => {
        this.tiendas = tiendas;
        this.tiendas.forEach((tienda: Tienda) => {
          if (!tienda.logo || !tienda.logo.referencia) tienda.host = null;
          else tienda.host = this.host + tienda.logo.referencia;

          if (tienda.direccion) {
            tienda.localizacion = `${tienda.direccion.calle}, ${tienda.direccion.colonia}, ${tienda.direccion.municipio}, ${tienda.direccion.codigoPostal}, ${tienda.direccion.entidadFederativa}`;
          } else {
            tienda.localizacion = '';
            tienda.zonasTrabajo.forEach((zona:any) => {
              tienda.localizacion =  tienda.localizacion  + ', '  + zona.nombre;
            });
            tienda.localizacion = tienda.localizacion.slice(2,tienda.localizacion.length)
          }
          const accion = new AgregarTiendaActions(tienda);
          this.store.dispatch(accion);
        });
      });
  }
}
