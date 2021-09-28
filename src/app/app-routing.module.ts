import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendasComponent } from './tiendas/tiendas.component';


const routes: Routes = [

  {
    path: '',
    component: TiendasComponent,
  },
  // {
  //   path: 'tarea',
  //   component: TareaComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
