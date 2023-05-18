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

  constructor(
    private router: Router,
    private auth: AuthService,
    public commemorativeService: CommemorativeService,
    private toast: ToastifyNotificationsService
  ) {  }

  async ngOnInit(): Promise<void> {
    try {
      this.commemorativeService.commemorative = [];
      await this.commemorativeService.getRandomCommemorative('english');
    } catch (error) {
      this.toast.error(error);
    }
  }

  public async getCommemorativeByName(title: string): Promise<void> {
    try {
      // const commemorative = await this.commemorativeService.getCommemorativeByTitle(title);
      // this.commemorativeService.commemorative = commemorative;
      this.router.navigate(['/commemorative']);
    } catch (error) {
      this.toast.error(error);
    }
  }

  public async getCommemorativeByDate(date: string): Promise<void> {
    try {
      // const commemorative = await this.commemorativeService.getCommemorativeByDate(date);
      // this.commemorativeService.commemorative = commemorative;
      // this.router.navigate(['/commemorative']);
    } catch (error) {
      this.toast.error(error);
    }
  }


  public async editCommemorative(commemorative: CommemorativeModel): Promise<void> {
    try {
      this.router.navigate(['/edit-commemorative']);
    } catch (error) {
      this.toast.error(error);
    }
  }

  public async deleteCommemorative(commemorative: CommemorativeModel): Promise<void> {
    try {
      await this.commemorativeService.deleteCommemorative(commemorative);
      this.toast.success('Commemorative deleted successfully');
    } catch (error) {
      this.toast.error(error);
    }
  }


}
