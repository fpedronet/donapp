import { Injectable } from '@angular/core';

import lista from 'src/assets/json/listaopcione.json';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  menu: Menu = {};
  subMenu: Menu = {};
  listamenu: Menu[] = [];
  
  getListarMenu(){  
    this.listamenu= [];

    for(var i in lista) {
      this.menu = {};

      this.menu.url =lista[i].url;
      this.menu.nombre = lista[i].nombre;
      this.menu.icon = lista[i].icon;
      this.menu.visual= lista[i].visual;
      this.menu.visualVerificado= lista[i].visualVerificado;

      this.menu.subPages = [];
      if(lista[i].subPages != null){
        for(var j in lista[i].subPages){
          this.subMenu = {};
  
          this.subMenu.url = lista[i].subPages[j].url;
          this.subMenu.nombre = lista[i].subPages[j].nombre;
          this.subMenu.icon = lista[i].subPages[j].icon;
          this.subMenu.visual = lista[i].subPages[j].visual;
          this.subMenu.visualVerificado = lista[i].subPages[j].visualVerificado;
          this.subMenu.subPages = null;
          this.subMenu.showDetails=false;
          this.menu.subPages.push(this.subMenu);
        }
      }
      else{
        this.menu.subPages = null;
      }

      this.menu.showDetails=false;
      this.listamenu.push(this.menu);
   }
   //debugger;

   return this.listamenu;
  }
}
