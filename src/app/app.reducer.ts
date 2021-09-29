import { ActionReducerMap } from '@ngrx/store';
import * as fromTienda from './tiendas/tienda.reducer';
import { TiendaReducer } from './models/tiendaReducer.model';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';



export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}


export interface AppState {
  tiendasReducer: TiendaReducer,
  router: RouterReducerState<RouterStateUrl>;
}








export const appReducers: ActionReducerMap<AppState> = {
  tiendasReducer: fromTienda.tiendaReducer,
  router: routerReducer,
};
