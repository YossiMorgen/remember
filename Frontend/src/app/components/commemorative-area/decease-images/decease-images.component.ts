import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DeceaseImagesService } from 'src/app/services/commemorative-services/decease-images.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-decease-images',
  templateUrl: './decease-images.component.html',
  styleUrls: ['./decease-images.component.css']
})
export class DeceaseImagesComponent {

  public constructor(
    public imagesService: DeceaseImagesService,
    private toast: ToastifyNotificationsService,
    public router: Router,
    public auth: AuthService
  ) { }

  public async onFileSelected(event: any){
    const image = new FormData();
    image.append('image', event.target.files[0]);
    image.append('commemorativeID', this.router.url.split('/').pop());
    try {
      await this.imagesService.addDeceaseImage(image);
    }
    catch(err){
      this.toast.error(err);
    }
  }

  public async deleteImage(imageName: string){
    try {
      await this.imagesService.deleteDeceaseImage(imageName);
    }
    catch(err){
      this.toast.error(err);
    }
  }
}
