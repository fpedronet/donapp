import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  correoVerif: boolean;

  ngOnInit() {
    //console.log("ini");
    let users = this.usuarioService.sessionUsuario();
    this.correoVerif = true
    if(users!=null){
      this.correoVerif = (users.correoverif == '1');
    }

  }
  
}
