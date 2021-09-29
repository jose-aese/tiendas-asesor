import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as TiendaActions from './tienda.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TiendaEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  select$ = this.actions$.pipe(
    ofType(TiendaActions.SELECT_TIENDA),
    tap(() => this.router.navigate(['/tienda']))
  );
}
