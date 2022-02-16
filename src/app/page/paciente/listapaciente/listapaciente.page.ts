import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapaciente',
  templateUrl: './listapaciente.page.html',
  styleUrls: ['./listapaciente.page.scss'],
})
export class ListapacientePage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  inicio(){
    this.router.navigate(['inicio']);
  }

  nuevo(){
    this.router.navigate(['crearpaciente']);
  }
}
