import { Action } from '@ngrx/store';
import { Tienda } from '../models/tienda.model';

export const AGREGAR_TIENDA = '[TIENDA] Agregar Tienda';


export const SELECT_TIENDA = '[TIENDA] Seleccionar una Tienda';


export const BORRARTIENDAS = '[TIENDA] Reinicia el Store de Tiendas';

export const SIGNOUT = '[TIENDA] Reinicia todo el Store';

export class AgregarTiendaActions implements Action {
    readonly type = AGREGAR_TIENDA;

    constructor(public tienda: Tienda) {}
}

export class SelectTiendaActions implements Action {
    readonly type = SELECT_TIENDA;

    constructor(public tienda: Tienda) {}
}


export class BorrarTiendaActions implements Action {
    readonly type = BORRARTIENDAS;

    constructor() {}
}
export class SignOutActions implements Action {
    readonly type = SIGNOUT;

    constructor() {}
}


export type Acciones = AgregarTiendaActions | SelectTiendaActions | BorrarTiendaActions | SignOutActions ;
