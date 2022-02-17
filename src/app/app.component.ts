import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private menuService : MenuService,
    private usuarioService : UsuarioService,
  ) {
    router.events.subscribe((val) => {
      // see also 
      this.muestraCamposUser()
  });
  }

  menus: Menu[] = [];
  user: string;
  nombres: string;
  apellidos: string;
  dni: string;

  userActive: boolean = false;
  
  ngOnInit(): void {
    this.listar();   
  }

  listar(){
    let listaMenu = this.menuService.getListarMenu();

    this.menus = listaMenu.filter(x=>x.visual==true);

    this.muestraCamposUser();
  }

  muestraCamposUser(){
    let users = this.usuarioService.sessionUsuario();
    
    this.userActive = false;
    
    if(users!=null){
      //debugger;
      this.user = users.usuario;
      this.nombres = users.nombres;
      this.apellidos = users.appaterno + ' ' + users.apmaterno;
      this.dni = users.documento;
      this.userActive = true;
    }
  }

  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
    this.userActive = false;
  }
  
}
