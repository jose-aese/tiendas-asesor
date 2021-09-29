import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TiendasComponent } from './tiendas/tiendas.component';
import { ListTiendasComponent } from './tiendas/list-tiendas/list-tiendas.component';
import { TiendaItemComponent } from './tiendas/tienda-item/tienda-item.component';
import { SearchComponent } from './tiendas/search/search.component';


// REDUX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';
import { TiendaComponent } from './tiendas/tienda/tienda.component';
import { EffectsModule } from '@ngrx/effects';
import { TiendaEffects } from './tiendas/tienda.effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';



export const effectsArr: any[] = [ TiendaEffects];

export interface ParamsRouterState {
  url: string;
  params: {};
  queryParams: {};
}
export class ParamsSerializer
  implements RouterStateSerializer<ParamsRouterState> {
  serialize(routerState: RouterStateSnapshot): ParamsRouterState {
    let route = routerState.root;
    let { params, queryParams } = routerState.root;
    while (route.firstChild) {
      route = route.firstChild; params =
        { ...params, ...route.params };
      queryParams = { ...queryParams, ...route.queryParams };
    }
    return { url: routerState.url, params, queryParams };
  }
}


@NgModule({
  declarations: [
    AppComponent,
    TiendasComponent,
    ListTiendasComponent,
    TiendaItemComponent,
    SearchComponent,
    TiendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effectsArr),
    StoreRouterConnectingModule.forRoot({ serializer: ParamsSerializer, })


  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
