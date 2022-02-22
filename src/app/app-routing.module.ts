import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './_service/guard.service';

const routes: Routes = [
  {path: 'login',canActivate: [GuardService], loadChildren: () => import('./page/usuario/login/login.module').then( m => m.LoginPageModule)},
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  
  {path: 'inicio',canActivate: [GuardService],loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)},
  
  {path: 'lpersona',canActivate: [GuardService],loadChildren: () => import('./page/persona/lpersona/lpersona.module').then( m => m.LpersonaPageModule)},
  {path: 'cpersona',loadChildren: () => import('./page/persona/cpersona/cpersona.module').then( m => m.CpersonaPageModule)},
  
  {path: 'lcita',loadChildren: () => import('./page/cita/lcita/lcita.module').then( m => m.LcitaPageModule)},
  {path: 'ccita/create/:tipo',loadChildren: () => import('./page/cita/ccita/ccita.module').then( m => m.CcitaPageModule)},
  {path: 'ccita/edit/:id/:ver',loadChildren: () => import('./page/cita/ccita/ccita.module').then( m => m.CcitaPageModule)},
  
  {path: 'ldemo',loadChildren: () => import('./page/demo/ldemo/ldemo.module').then( m => m.LdemoPageModule)},
  {path: 'cdemo/create',loadChildren: () => import('./page/demo/cdemo/cdemo.module').then( m => m.CdemoPageModule)},
  {path: 'cdemo/edit/:id/:ver',loadChildren: () => import('./page/demo/cdemo/cdemo.module').then( m => m.CdemoPageModule)},


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
