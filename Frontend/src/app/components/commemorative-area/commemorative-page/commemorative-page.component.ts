import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CommemorativeModel from 'src/app/models/commemorative-models/commemorative-model';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-commemorative-page',
  templateUrl: './commemorative-page.component.html',
  styleUrls: ['./commemorative-page.component.css']
})
export class CommemorativePageComponent implements OnInit {
  
  public commemorative: CommemorativeModel
  constructor(
    private router: Router,
    private commemorativeService: CommemorativeService,
    private toast: ToastifyNotificationsService
  ) { }

async ngOnInit(): Promise<void> {
  try {    
    this.commemorative = await this.commemorativeService.getCommemorativeById(+this.router.url.split('/').pop());    
  } catch (error) {
    this.toast.error(error);
  }
}
}
