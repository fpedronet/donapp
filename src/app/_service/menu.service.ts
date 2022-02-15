import { Injectable } from '@angular/core';

import lista from 'src/assets/json/listaopcione.json';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menus: Menu = {};
  listamenu: Menu[] = [];
  
  getListarMenu(){  
    this.listamenu= [];

    for(var k in lista) {
      this.menus ={};

      this.menus.url =lista[k].url;
      this.menus.nombre =lista[k].nombre;
      this.menus.icon =lista[k].icon;
      this.menus.admin=lista[k].admin;
      this.listamenu.push(this.menus);
   }


   return this.listamenu;
  }
}
