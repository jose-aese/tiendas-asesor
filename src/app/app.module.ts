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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
