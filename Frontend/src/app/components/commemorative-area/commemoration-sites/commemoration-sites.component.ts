import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommemorationSiteService } from 'src/app/services/commemorative-services/commemoration-site.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-commemoration-sites',
  templateUrl: './commemoration-sites.component.html',
  styleUrls: ['./commemoration-sites.component.css']
})
export class CommemorationSitesComponent implements OnInit {

  constructor(
    public router: Router,
    public commemorationSiteService: CommemorationSiteService,
    public toast: ToastifyNotificationsService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      if(!this.commemorationSiteService.commemorationSites.length){
        await this.commemorationSiteService.getAllCommemorationSitesByCommemorativeID(+this.router.url.split('/').pop());
        console.log(this.commemorationSiteService.commemorationSites);
        
      }
    } catch (error) {
      this.toast.error(error);
    }
  }
}
