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
  count: number = 0;
  number: number = 0;
  next: boolean = true;
  interval;
  
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
          this.count = data.items.length;

          this.startTimer();
        }        
      });

    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.swipeNext();
    },3000)
  }

  swipeNext(){
    if(this.count > this.number && this.next){

      this.number++;
      this.slides.slideNext();

    }else{
      this.number--;
      this.next=false;

      if(this.number==0){
        this.next=true;
      }

      this.slides.slidePrev();
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
