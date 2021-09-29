import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Tienda } from '../../models/tienda.model';
import { SelectTiendaActions } from '../tienda.actions';
@Component({
  selector: 'tienda-item',
  templateUrl: './tienda-item.component.html',
  styleUrls: ['./tienda-item.component.scss']
})
export class TiendaItemComponent implements OnInit {

  @Input() tienda: Tienda;
  constructor(private store: Store<AppState> ) { }

  ngOnInit(): void {
  }

  seleccionaTarea(){
    const accion = new SelectTiendaActions(this.tienda);
    this.store.dispatch(accion);
  }
}
