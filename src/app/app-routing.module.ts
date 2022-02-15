import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'crearpaciente',
    loadChildren: () => import('./page/paciente/crearpaciente/crearpaciente.module').then( m => m.CrearpacientePageModule)
  },
  {
    path: 'listapaciente',
    loadChildren: () => import('./page/paciente/listapaciente/listapaciente.module').then( m => m.ListapacientePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)
   },  {
    path: 'crearpersona',
    loadChildren: () => import('./page/persona/crearpersona/crearpersona.module').then( m => m.CrearpersonaPageModule)
  },
  {
    path: 'listapersona',
    loadChildren: () => import('./page/persona/listapersona/listapersona.module').then( m => m.ListapersonaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
