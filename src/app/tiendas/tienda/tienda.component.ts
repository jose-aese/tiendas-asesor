import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Dia, Horario } from 'src/app/models/horario.model';
import { TiendaReducer } from 'src/app/models/tiendaReducer.model';
import { Tienda } from '../../models/tienda.model';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  public tienda: Tienda;
  public show: boolean;
  public horario: boolean;
  public open: boolean;
  public openTitle: string;
  private destroy$: Subject<void> = new Subject<void>();
  public dias: Dia[];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('tiendasReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe((tiendaSelec: TiendaReducer) => {
        this.tienda = tiendaSelec.tienda;
        console.log(this.tienda);
        this.abierto(this.tienda.horario);
        if (this.tienda) this.show = true;
      });
  }

  abierto = (horas: Horario) => {
    if (horas.disponibilidad) {
      this.open = true;
      this.openTitle = 'Abierto';
      this.horario = true;
      return;
    } else {

      this.dias = horas.dias;
      // this.open = false;
      // this.horario = false;
      // this.openTitle = 'Cerrado';
    }
  };

  hora() {
    this.horario = !this.horario;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
