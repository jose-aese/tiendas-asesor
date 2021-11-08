import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify, { Auth, Interactions } from 'aws-amplify';
import {  AmplifyModules, AmplifyService } from 'aws-amplify-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ProductoComponent } from './productos/producto/producto.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { metaReducers } from './metaReducers';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_l28ZnZfWw',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'vj3lc3com6fcjd5p4d65sp9pn',
    //userPoolWebClientId: '60f8or2nvin7pt7ufe8h2g13ug',
  }
});

export const effectsArr: any[] = [TiendaEffects];

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
    TiendaComponent,
    ProductoComponent,
    LoginComponent
  ],
  imports: [
   // AmplifyAngularModule,
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule,
     AmplifyUIAngularModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot((appReducers), {
      runtimeChecks: {
      },
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effectsArr),
    StoreRouterConnectingModule.forRoot({ serializer: ParamsSerializer, })

  ],
  providers: [
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({
          Auth,
          Storage,
          Interactions
        });
      }
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true   
      },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
