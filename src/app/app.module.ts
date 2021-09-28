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



@NgModule({
  declarations: [
    AppComponent,
    TiendasComponent,
    ListTiendasComponent,
    TiendaItemComponent,
    SearchComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
