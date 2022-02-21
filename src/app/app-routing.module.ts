import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './_service/guard.service';

const routes: Routes = [
  {path: 'login',canActivate: [GuardService], loadChildren: () => import('./page/usuario/login/login.module').then( m => m.LoginPageModule)},
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  
  {path: 'inicio',canActivate: [GuardService],loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)},
  
  {path: 'crearpersona',loadChildren: () => import('./page/persona/crearpersona/crearpersona.module').then( m => m.CrearpersonaPageModule)},
  {path: 'listapersona',canActivate: [GuardService],loadChildren: () => import('./page/persona/listapersona/listapersona.module').then( m => m.ListapersonaPageModule)},
  
  {path: 'crearcita',loadChildren: () => import('./page/cita/crearcita/crearcita.module').then( m => m.CrearcitaPageModule)},
  {path: 'listacita',loadChildren: () => import('./page/cita/listacita/listacita.module').then( m => m.ListacitaPageModule)},
  
  
  {path: 'ldemo',loadChildren: () => import('./page/demo/ldemo/ldemo.module').then( m => m.LdemoPageModule)},
  {path: 'cdemo/create',loadChildren: () => import('./page/demo/cdemo/cdemo.module').then( m => m.CdemoPageModule)},
  {path: 'cdemo/edit/:id',loadChildren: () => import('./page/demo/cdemo/cdemo.module').then( m => m.CdemoPageModule)},
  {path: 'cdemo/ver/:id/:ver',loadChildren: () => import('./page/demo/cdemo/cdemo.module').then( m => m.CdemoPageModule)},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
