import { Component } from '@angular/core';
import { Subject } from 'rxjs';
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

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private spiner: Spiner,private authService:AuthService) { }
  ngOnInit(): void {    
    this.spiner.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut() {
    this.authService.signOut();
  }
}