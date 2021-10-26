import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tiendas/tienda/tienda.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [

  {
    path: '',pathMatch: 'full',redirectTo: 'login'
  },
  {
    path: 'login',  component: LoginComponent
  },
  {
    path: 'tiendas',
    component: TiendasComponent,
    canActivate:[UserGuard]
  },
  {
    path: 'tienda',
    component: TiendaComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
