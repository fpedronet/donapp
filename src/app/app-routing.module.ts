import { NgModule, ViewChild } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './_service/guard.service';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: 'home',canActivate: [GuardService], loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)},
  {path: 'login',canActivate: [GuardService], loadChildren: () => import('./page/usuario/login/login.module').then( m => m.LoginPageModule)},
  
  {path: 'inicio',canActivate: [GuardService],loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)},
  
  {path: 'lpersona',canActivate: [GuardService],loadChildren: () => import('./page/persona/lpersona/lpersona.module').then( m => m.LpersonaPageModule)},
  {path: 'cpersona',loadChildren: () => import('./page/persona/cpersona/cpersona.module').then( m => m.CpersonaPageModule)},
  
  {path: 'lcita',canActivate: [GuardService], loadChildren: () => import('./page/cita/lcita/lcita.module').then( m => m.LcitaPageModule)},
  {path: 'ccita/create/:tipo',canActivate: [GuardService], loadChildren: () => import('./page/cita/ccita/ccita.module').then( m => m.CcitaPageModule)},
  {path: 'ccita/edit/:id/:edit',canActivate: [GuardService], loadChildren: () => import('./page/cita/ccita/ccita.module').then( m => m.CcitaPageModule)},
  
   {
    path: 'verifcorreo',
    loadChildren: () => import('./page/verifcorreo/verifcorreo.module').then( m => m.VerifcorreoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// { preloadingStrategy: PreloadAllModules }