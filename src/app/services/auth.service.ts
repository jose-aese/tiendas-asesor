import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { SignOutActions } from '../tiendas/tienda.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {  
  public getToken(): string {
    return localStorage.getItem('token');
  }  
  constructor(private router: Router,private store: Store<AppState>,){}

	// public isAuthenticated(): boolean {    
  //     // get the token
  //     const token = this.getToken();    
  //     // return a boolean reflecting 
  //     // whether or not the token is expired
  //     return tokenNotExpired(null, token);  
  //   }


  async signOut() {
    try {
      await Auth.signOut({ global: true });
      localStorage.clear();
      sessionStorage.clear();
      const accion = new SignOutActions();
      this.store.dispatch(accion);
      this.router.navigate(['/login'])
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}