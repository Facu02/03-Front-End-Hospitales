import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutesModule } from './auth/auth.routing';


const routes: Routes = [

  // agregar docuemtnacion para saber que rutas estan creadas
  //  path :/auth AuthRouting
   {path: '' , redirectTo:'/dashboard', pathMatch:'full'},

  {  path: '**',  component: NopagefoundComponent}
  ]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutesModule,
    RouterModule
  ],
  exports:[
    RouterModule,
    
  ]
})
export class AppRoutingModule { }
