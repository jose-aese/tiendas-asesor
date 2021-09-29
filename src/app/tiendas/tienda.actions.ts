import { Action } from '@ngrx/store';
import { Tienda } from '../models/tienda.model';

export const AGREGAR_TIENDA = '[TIENDA] Agregar Tienda';


export const SELECT_TIENDA = '[TIENDA] Seleccionar una Tienda';

export class AgregarTiendaActions implements Action {
    readonly type = AGREGAR_TIENDA;

    constructor(public tienda: Tienda) {}
}

export class SelectTiendaActions implements Action {
    readonly type = SELECT_TIENDA;

    constructor(public tienda: Tienda) {}
}

export type Acciones = AgregarTiendaActions | SelectTiendaActions ;
