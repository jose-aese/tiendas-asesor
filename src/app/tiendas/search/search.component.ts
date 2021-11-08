import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/services/tiendas.service';
import { map, take } from 'rxjs/operators';
import { Tienda } from '../../models/tienda.model';
import { ResponseServer } from 'src/app/models/responseServer.model';
import { AgregarTiendaActions, BorrarTiendaActions, CargaCategorias } from '../tienda.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Cypher } from 'src/app/services/encrypt.service';
import { tiendasFilter } from '../../schemas/tiendas';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TiendaReducer } from 'src/app/models/tiendaReducer.model';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private host = environment.hostImagenes;
  filtros = {
    nomTienda: null,
    numAsesor: null,
    codigoPostal: null,
    estado: null,
    colonia: null,
    numReg: null
  };
  tiendas: any;
  public categorias: any[];
  public seleccionado: any;
  public seleccionadoSubCat: any;
  public subCat: any[];

  constructor(
    private tiendasService: TiendasService,
    private store: Store<AppState>,
    private cypher: Cypher,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.store.select('tiendasReducer').pipe(take(1), map((res: TiendaReducer) => res.categorias)).subscribe(categorias => {
      if (!categorias) {
        this.tiendasService.categorias().pipe(
          map((response: ResponseServer) =>
            response.codigo ==
              '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000'
              ? response.resultado.categorias
              : []
          )
        ).subscribe(
          (response: any[]): void => {
            if (response.length > 0) {
              this.categorias = response;
              const agregarCategorias = new CargaCategorias(this.categorias);
              this.store.dispatch(agregarCategorias);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudieron obtener las categorias!',
              });
            }
          },
          (err: { status: number; }) => {
            console.log(err)
            if (err.status == 401 || err.status == 403)
              this.authService.signOut();
          });
      } else {
        this.categorias  = categorias;
      }
    });
  }

  async seleccionaEmpleado() {
    let filtro = await this.validaciones();
    console.log(filtro);
    let numeroRegistros: number;
    this.filtros.numReg ? numeroRegistros = parseInt(this.filtros.numReg) : numeroRegistros = 30;
    const accion = new BorrarTiendaActions();
    this.store.dispatch(accion);
    this.tiendasService
      .tiendas(filtro, numeroRegistros)
      .pipe(
        map((response: ResponseServer) => {
          if (response.codigo ==
            '200.Elektra-Transformacion-Digital-Gestion-Tiendas.0000') {
            response.resultado.paginaSiguiente ? localStorage.setItem('paginaSiguiente', response.resultado.paginaSiguiente) : localStorage.removeItem('paginaSiguiente')
            return response.resultado.tiendas
          } else {
            return [];
          }
        }
        )
      )
      .subscribe(async (tiendas: Tienda[]) => {
        localStorage.setItem('filtro', JSON.stringify(filtro));
        localStorage.setItem('numeroRegistros', numeroRegistros.toString());
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

  selectCat(): void {
    console.log(this.seleccionado);
    if (this.seleccionado == "undefined") {
      this.seleccionado = undefined;
      this.subCat = [];
    } else {
      let cat = this.categorias.filter(cat => cat.id == this.seleccionado);
      this.subCat = cat[0].subcategorias;
    }

    this.seleccionadoSubCat = undefined;
  }

  selectSubCat(): void {
    console.log(this.seleccionadoSubCat);
    if (this.seleccionadoSubCat == "undefined")
      this.seleccionadoSubCat = undefined;
  }

  validaciones = async () => {
    let filto = [];
    if (this.filtros.codigoPostal) {
      filto.push({
        campo: "direccion.codigoPostal",
        valor: this.filtros.codigoPostal
      });
    }

    if (this.filtros.colonia) {
      filto.push({
        campo: "direccion.colonia",
        valor: this.filtros.colonia
      })
    }

    if (this.filtros.estado) {
      filto.push({
        campo: "direccion.entidadFederativa",
        valor: this.filtros.estado
      })
    }

    if (this.filtros.nomTienda) {
      filto.push({
        campo: "nombreTienda",
        valor: this.filtros.nomTienda
      })
    }

    if (this.filtros.numAsesor) {
      filto.push({
        campo: "numeroEmpleado",
        valor: this.filtros.numAsesor
      })
    }

    if (this.seleccionado) {
      let cat = this.categorias.filter(cat => cat.id == this.seleccionado);
      let value = cat[0].nombre;
      filto.push({
        campo: "categoria.nombre",
        valor: value
      })
    }

    if (this.seleccionadoSubCat) {
      let subCat = this.subCat.filter(subCat => subCat.id == this.seleccionadoSubCat);
      let value = subCat[0].nombre;
      filto.push({
        campo: "categoria.subcategorias.nombre",
        valor: value
      })
    }
    return filto;
  }
}
