import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { UsuarioService } from './_service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private router: Router,
    private menuService : MenuService,
    private usuarioService : UsuarioService,
  ) {}

  menus: Menu[] = [];
  user: string;
  dni: string;
  
  ngOnInit(): void {
    this.listar();   
  }

  listar(){
    let listaMenu = this.menuService.getListarMenu();

    this.menus = listaMenu.filter(x=>x.visual==true);

    let users = this.usuarioService.sessionUsuario();
    if(users!=null){
      this.user = users.usuario;
      this.dni = users.documento;
    }
  }

  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}
