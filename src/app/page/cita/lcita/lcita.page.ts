import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from 'src/app/_service/cita.service';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastService } from '../../components/toast/toast.service';

@Component({
  selector: 'app-lcita',
  templateUrl: './lcita.page.html',
  styleUrls: ['./lcita.page.scss'],
})
export class LcitaPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private loadingService : LoadingService,   
    private toastService : ToastService
  ) { }

  ngOnInit() {
  }

}
