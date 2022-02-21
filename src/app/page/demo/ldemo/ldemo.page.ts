import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ldemo',
  templateUrl: './ldemo.page.html',
  styleUrls: ['./ldemo.page.scss'],
})
export class LdemoPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  inicio(){
    this.router.navigate(['inicio']);
  }

  nuevo(){
    this.router.navigate(['cdemo']);
  }

}
