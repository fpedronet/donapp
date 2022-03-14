import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { UsuarioService } from './_service/usuario.service';

import { SplashScreen } from '@capacitor/splash-screen';

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
    private menu: MenuController
  ) {
    router.events.subscribe((val) => {
      this.listar();
    });
  }

  menus: Menu[] = [];
  user: string;
  nombres: string;
  apellidos: string;
  dni: string;
  correoVerif: boolean = false;

  userActive: boolean = false;
  
  ngOnInit(): void {
    //this.listar();   
    this.initializeApp();
  }

  initializeApp() {
     SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
}

  listar(){
    this.muestraCamposUser();

    let listaMenu = this.menuService.getListarMenu();
    //debugger;

    this.menus = listaMenu.filter(x => ((x.visual==true) && (this.correoVerif==true||x.visualVerificado==true)));
    this.menus.forEach(m => {
      if(m.subPages !== null){
        m.subPages = m.subPages.filter(x => ((x.visual==true) && (this.correoVerif==true||x.visualVerificado==true)));
      }
    });    
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
      this.correoVerif = (users.correoverif == '1');
    }
  }

  toggleDetails(p) {
    if (p.showDetails) {
        p.showDetails = false;
        //p.icon = 'ios-arrow-down';
    } else {
        p.showDetails = true;
        //p.icon = 'ios-arrow-up';

    }
  }

  closeLogin(){
    // GoogleAuth.signOut().then(() => {
    //   debugger;
    //   localStorage.clear();
    //   this.router.navigate(['']);
    // },
    // err =>{
    //   console.log(err);
    // });
   
    localStorage.clear();
    this.router.navigate(['']);
    this.userActive = false;
  }
  
  openPage(url: string){
    if(url !== ''){
      this.menu.close();
      this.router.navigate([url]);
    }    
  }
}
