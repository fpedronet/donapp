import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  form: FormGroup = new FormGroup({});
  
  ngOnInit() {
    
    this.form = new FormGroup({
      'nIdCliente': new FormControl(),
      'usuario': new FormControl(''),
      'clave': new FormControl('')
    });
  }

}
