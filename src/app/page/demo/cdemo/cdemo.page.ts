import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cdemo',
  templateUrl: './cdemo.page.html',
  styleUrls: ['./cdemo.page.scss'],
})
export class CdemoPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  inicio(){
    this.router.navigate(['inicio']);
  }

  regresar(){
    this.router.navigate(['ldemo']);
  }

}
