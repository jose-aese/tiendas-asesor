import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Tienda } from '../models/tienda.model';

@Component({
  selector: 'list-tiendas',
  templateUrl: './list-tiendas.component.html',
  styleUrls: ['./list-tiendas.component.scss']
})
export class ListTiendasComponent implements OnInit {

  tiendas: Tienda[];
  private destroy$: Subject<void> = new Subject<void>();
  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('tiendas').pipe(takeUntil(this.destroy$)).subscribe((tiendas:Tienda[]) =>  this.tiendas = tiendas);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
