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

  enviarCodigo(){
    this.loadingService.openLoading();
    this.emailService.verificar(this.correo).subscribe(data=>{      
      this.codigoGenerado = data;
      this.loadingService.closeLoading();
    })
  }

  verificarCodigo(){
    let vCar1 = this.form.value['vCar1'];
    let vCar2 = this.form.value['vCar2'];
    let vCar3 = this.form.value['vCar3'];
    let vCar4 = this.form.value['vCar4'];
    
    this.codigoLeido = vCar1 + vCar2 + vCar3 + vCar4;

    if(this.codigoLeido.length !== 4){
      this.toastService.showNotification(2,'Mensaje','Ingrese el código de 4 dígitos');
    }
    else{
      if(this.codigoGenerado !== this.codigoLeido){
        this.toastService.showNotification(2,'Mensaje','El código ingresado es incorrecto');
      }
      else{
        //Correo verificado
        this.actualizaEstadoVerificado();
      }
    }
  }

  actualizaEstadoVerificado(){
    this.loadingService.openLoading();
    this.usuarioService.verificarCorreo(this.persona.nIdPersona).subscribe(data=>{   

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
