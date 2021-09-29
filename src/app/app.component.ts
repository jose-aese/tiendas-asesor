import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tiendas';
  show: boolean;

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store
      .select('router')
      .pipe(takeUntil(this.destroy$))
      .pipe(map((router) => (router ? router.state.url : null)))
      .subscribe((router) => {
        router === '/tienda' ? (this.show = false) : (this.show = true);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
