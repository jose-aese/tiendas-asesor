import * as fromTiendas from './tienda.actions';
import { Tienda } from '../models/tienda.model';
import { TiendaReducer } from '../models/tiendaReducer.model';

export function tiendaReducer(
  state = { tiendas: [], tienda: null, categorias: null },
  action: fromTiendas.Acciones
): TiendaReducer {
  switch (action.type) {
    case fromTiendas.AGREGAR_TIENDA:
      const tien = new Tienda(action.tienda);
      return {
        ...state,
        tiendas: [...state.tiendas, tien],
      };

    case fromTiendas.SELECT_TIENDA:
      const tiendaSelecionada = new Tienda(action.tienda);
      return {
        ...state,
        tienda: tiendaSelecionada,
      };

    case fromTiendas.BORRARTIENDAS:
      return {
        ...state,
        tiendas: [],
      };

    case fromTiendas.SIGNOUT:
      return {
        ...state,
        tiendas: [],
        tienda: null,
        categorias: null
      };

    case fromTiendas.CATEGORIAS:
      return {
        ...state,
        categorias: action.categorias
      };
    default:
      return state;
  }
}
