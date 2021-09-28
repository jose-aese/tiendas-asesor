import { Tienda } from './tiendas/models/tienda.model';
import { ActionReducerMap } from '@ngrx/store';
import * as fromTienda from './tiendas/tienda.reducer';

export interface AppState {
  tiendas: Tienda[];
}

export const appReducers: ActionReducerMap<AppState> = {
    tiendas: fromTienda.tiendaReducer,
};
