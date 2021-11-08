import { Component } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { AppState, RouterStateUrl } from './app.reducer';
import { AuthService } from './services/auth.service';
import { Spiner } from './services/spiner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tiendas';
  show: boolean;
  mo
  private routing: RouterReducerState<RouterStateUrl>;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private spiner: Spiner, private authService: AuthService, private store: Store<AppState>,) { }
  ngOnInit(): void {
    this.spiner.close();

    this.store.select('router').pipe( map(router => router), takeUntil(this.destroy$)).subscribe(router => {
      
      if(router && router.state){
        console.log(router)
        if(router.state.url == '/login'){
          this.show = false;
        }else{
          this.show = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut() {
    this.authService.signOut();
  }
}