import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tiendas/tienda/tienda.component';
import { TiendasComponent } from './tiendas/tiendas.component';


const routes: Routes = [

  {
    path: '',
    component: TiendasComponent,
  },
  {
    path: 'tienda',
    component: TiendaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
