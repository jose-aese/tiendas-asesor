import { Action } from '@ngrx/store';
import { Tienda } from './models/tienda.model';

export const AGREGAR_TIENDA = '[TIENDA] Agregar Tienda';

export class AgregarTiendaActions implements Action {
    readonly type = AGREGAR_TIENDA;

    constructor(public tienda: Tienda) {}
}

export type Acciones = AgregarTiendaActions ;
