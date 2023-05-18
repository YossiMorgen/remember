import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CommemorativeModel from 'src/app/models/commemorative-models/commemorative-model';
import { AuthService } from 'src/app/services/auth.service';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-commemorative-list',
  templateUrl: './commemorative-list.component.html',
  styleUrls: ['./commemorative-list.component.css']
})
export class CommemorativeListComponent implements OnInit {

  public commemorativeList: CommemorativeModel[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private commemorativeService: CommemorativeService,
    private toast: ToastifyNotificationsService
  ) {  }

  ngOnInit(): void {
    try {
      this.commemorativeService.getRandomCommemorative('english');
      console.log(this.commemorativeService.commemorative);
      
    } catch (error) {
      this.toast.error(error);
    }
  }



}
