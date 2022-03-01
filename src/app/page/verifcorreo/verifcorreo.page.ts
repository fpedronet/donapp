import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/_service/persona.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { EmailService } from 'src/app/_service/email.service';
import { LoadingService } from '../components/loading/loading.service';
import { ToastService } from '../components/toast/toast.service';
import { Persona } from 'src/app/_model/persona';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verifcorreo',
  templateUrl: './verifcorreo.page.html',
  styleUrls: ['./verifcorreo.page.scss'],
})
export class VerifcorreoPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personaService : PersonaService,
    private usuarioService : UsuarioService,
    private emailService : EmailService,
    private loadingService : LoadingService,   
    private toastService : ToastService,
  ) { }

  form: FormGroup = new FormGroup({});
  loading:any;

  correo: string = 'example@mail.com';
  persona: Persona;

  codigoGenerado: string = '';
  codigoLeido: string = '';
  horaEnvioCodigo: Date = new Date();
  minVigencia: number = 10;

  timerVisible: boolean = false;
  timerId: any;
  maxTime: number = 30;
  timeResend: number;
  disableResend: boolean = true;

  ngOnInit() {
    this.form = new FormGroup({
      'vCar1': new FormControl({value: '', disabled: false}),
      'vCar2': new FormControl({value: '', disabled: false}),
      'vCar3': new FormControl({value: '', disabled: false}),
      'vCar4': new FormControl({value: '', disabled: false}),
    });
    this.obtener();    
  }

  obtener(){
    this.loadingService.openLoading();
    this.personaService.obtener(0).subscribe(data=>{

      this.persona = data;
      if(this.persona !== undefined){
        this.correo = data.vEmail;
        this.enviarCodigo();
      }        

      this.loadingService.closeLoading();
    });
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    }
  }

  StartTimer(){
    this.timerId = setTimeout(x => 
      {
        if(this.timeResend <= 0) { }
        this.timeResend -= 1;

        if(this.timeResend>0){
          this.disableResend = true;
          this.StartTimer();
        }
        
        else{
          this.disableResend = false;
        }

      }, 1000);
  }

  timeHHmm(sec: number){
    var HH = Math.floor(sec/60);
    var mm =sec%60;

    return HH.toString().padStart(2, '00') + ':' + mm.toString().padStart(2, '00')
  }

  enviarCodigo(){
    this.disableResend = true;
    this.loadingService.openLoading();
    this.emailService.verificar(this.correo).subscribe(data=>{
      //debugger;
      this.codigoGenerado = data.codigo;
      this.horaEnvioCodigo = new Date();

      this.timeResend = this.maxTime;
      this.timerVisible = true;
      this.StartTimer();
      
      this.loadingService.closeLoading();
    })
  }

  verificarCodigo(){
    
    this.codigoLeido = this.codigoCompleto();

    //debugger;

    if(this.codigoLeido.length !== 4){
      this.toastService.showNotification(2,'Mensaje','Ingrese el código de 4 dígitos');
    }
    //El código vence en 1 hora (60 min)
    else if(this.diferenciaMinutos(this.horaEnvioCodigo, new Date()) > this.minVigencia){
      this.toastService.showNotification(2,'Mensaje','El código ha vencido, reenvíe nuevamente');
    }
    else if(this.codigoGenerado !== this.codigoLeido) {
      this.toastService.showNotification(2,'Mensaje','El código ingresado es incorrecto');
    }
    else{
      //Correo verificado
      this.actualizaEstadoVerificado();
    }
  }

  diferenciaMinutos(d1: Date, d2: Date){
    var t1 = d1.getTime();
    var t2 = d2.getTime();

    var dif = t2 - t1;
    console.log(dif/(1000*60));
    return dif/(1000*60);
  }

  codigoCompleto(){
    let vCar1 = this.form.value['vCar1'];
    let vCar2 = this.form.value['vCar2'];
    let vCar3 = this.form.value['vCar3'];
    let vCar4 = this.form.value['vCar4'];
    
    return vCar1 + vCar2 + vCar3 + vCar4;
  }

  actualizaEstadoVerificado(){
    this.loadingService.openLoading();
    //debugger;
    this.usuarioService.verificarCorreo(this.persona.usuario).subscribe(data=>{   

      this.toastService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.loadingService.closeLoading();
        this.router.navigate(['inicio']);
        
      }else{
        this.loadingService.closeLoading();
      }
    });
  }
}
