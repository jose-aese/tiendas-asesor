import * as fromTiendas from './tienda.actions';
import { Tienda } from './models/tienda.model';

const estadoInicial: Tienda[] = [];
export function tiendaReducer(
  state = estadoInicial,
  action: fromTiendas.Acciones
): Tienda[] {
  switch (action.type) {
    case fromTiendas.AGREGAR_TIENDA:
      const tienda = new Tienda(action.tienda);
      return [...state, tienda];
    default:
      return state;
  }
}
