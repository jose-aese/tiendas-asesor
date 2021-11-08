import { Tienda } from './tienda.model';

export interface TiendaReducer {
    tiendas: Tienda[];
    tienda: Tienda;
    categorias: any
  }