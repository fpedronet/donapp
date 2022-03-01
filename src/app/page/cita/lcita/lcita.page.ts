import { Cita } from 'src/app/_model/cita';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { CitaService } from 'src/app/_service/cita.service';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-lcita',
  templateUrl: './lcita.page.html',
  styleUrls: ['./lcita.page.scss'],
})
export class LcitaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private loadingService : LoadingService,   
    private toastService : ToastService
  ) { }

  dataSource: Cita[] = [];
  dataCita: Cita[] = [];
  total: number = 0;
  data: string = "";
  page: number= 0;

  ngOnInit() {
    this.loadData();
  }

  loadData(event?) {
    setTimeout(() => {

      // this.page = (this.data !="")? 0: this.page;

      this.citaService.listar(this.data, this.page, 10).subscribe(data=>{

        this.dataSource = data.items;

        // if(this.dataSource.length>0){
         this.dataSource.forEach(element => {          
            let model = new Cita();
  
            model.fechaProgramada= element.fechaProgramada;
            model.vTipoCita= element.vTipoCita;
            model.vBanco= element.vBanco;
  
            this.dataCita.push(model);
          });

          this.total += data.pagination.pages;

          if(this.total == data.pagination.total){
            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = true;
            return;
          }
      });      

      this.infiniteScroll.complete();

      this.page++;

    }, 500);
  }

  inicio(){
    this.router.navigate(['inicio']);
  }

  nuevo(){
    this.router.navigate(['ccita/create']);
  }

  edit(){
    this.router.navigate(['ccita/edit/1']);
  }

}
