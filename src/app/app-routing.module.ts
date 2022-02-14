import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./page/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crearpaciente',
    loadChildren: () => import('./page/paciente/crearpaciente/crearpaciente.module').then( m => m.CrearpacientePageModule)
  },
  {
    path: 'listapaciente',
    loadChildren: () => import('./page/paciente/listapaciente/listapaciente.module').then( m => m.ListapacientePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
