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

  @ViewChild('slides')  slides: IonSlides;
  buttonName = "NEXT";
  selectedSlide: any;

  constructor(
    private usuarioService: UsuarioService,
    private publicidadService: PublicidadService
  ) { }

  correoVerif: boolean;
  dataSource: Publicidad[] = [];
  diaRestante: string;
  diaCaducado: boolean = false;

  ngOnInit() {
    let users = this.usuarioService.sessionUsuario();
    this.correoVerif = true

    if(users!=null){
      this.correoVerif = (users.correoverif == '1');

      this.publicidadService.listar().subscribe(data=>{

        this.diaRestante = data.message;
        this.diaCaducado = (data.message=="0")? true: false;

        if(this.correoVerif && !this.diaCaducado){
          this.dataSource = data.items;
        }        
      });

    }
  }

  ionSlideChange(slides){
    this.selectedSlide = slides;

    slides.getActiveIndex().then(
      (slidesIndex)=>{
        if(slidesIndex==2){
          this.buttonName="GET STARTED";
        }else{
          this.buttonName="NEXT";
        }
      });
  }

}
