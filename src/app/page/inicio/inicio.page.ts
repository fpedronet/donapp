import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_service/usuario.service';
 
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { PublicidadService } from 'src/app/_service/publicidad.service';
import { Publicidad } from 'src/app/_model/publicidad';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild('mySlider')  slides: IonSlides;
  
  constructor(
    private usuarioService: UsuarioService,
    private publicidadService: PublicidadService
  ) { }

  correoVerif: boolean;
  dataSource: Publicidad[] = [];

  ngOnInit() {
    let users = this.usuarioService.sessionUsuario();
    this.correoVerif = true
    if(users!=null){
      this.correoVerif = (users.correoverif == '1');

      if(this.correoVerif){
        this.publicidadService.listar().subscribe(data=>{
          this.dataSource = data.items;
        });
      }
    }
  }

  swipeNext(){
    this.slides.slideNext();
  }
}
