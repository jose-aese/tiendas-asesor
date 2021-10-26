import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from 'aws-amplify';
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
  constructor(private store: Store<AppState>,private router: Router) { }
  ngOnInit(): void {
   /* this.store
      .select('router')
      .pipe(takeUntil(this.destroy$))
      .pipe(map((router) => (router ? router.state.url : null)))
      .subscribe((router) => {
        console.log(router)
        router === '/tienda' ? (this.show = false) : (this.show = true);
      });
      */
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 async signOut(){
    try {
      await Auth.signOut({ global: true });
      localStorage.clear();
      this.router.navigate(['/login'])
  } catch (error) {
      console.log('error signing out: ', error);
  }
  }
}
