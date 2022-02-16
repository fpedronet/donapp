import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearpaciente',
  templateUrl: './crearpaciente.page.html',
  styleUrls: ['./crearpaciente.page.scss'],
})
export class CrearpacientePage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  inicio(){
    this.router.navigate(['inicio']);
  }

  regresar(){
    this.router.navigate(['listapaciente']);
  }

}
