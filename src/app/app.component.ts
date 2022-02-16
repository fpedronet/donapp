import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private router: Router,
    private menuService : MenuService,
  ) {}

  menus: Menu[] = [];
  nombre: string;
  dni: string;
  
  ngOnInit(): void {
    this.listar();   
  }

  listar(){
    let listaMenu = this.menuService.getListarMenu();

    this.menus = listaMenu.filter(x=>x.visual==true);
  }

  closeLogin(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}
