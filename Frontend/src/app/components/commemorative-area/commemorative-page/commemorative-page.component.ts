import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import CommemorativeModel from 'src/app/models/commemorative-models/commemorative-model';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { DeceaseImagesService } from 'src/app/services/commemorative-services/decease-images.service';
import { StoryService } from 'src/app/services/commemorative-services/story.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-commemorative-page',
  templateUrl: './commemorative-page.component.html',
  styleUrls: ['./commemorative-page.component.css']
})
export class CommemorativePageComponent implements OnInit {
  public tabsState = 0;
  public commemorative = new CommemorativeModel();

  constructor(
    private router: Router,
    private commemorativeService: CommemorativeService,
    private deceaseImagesService: DeceaseImagesService,
    public storyService: StoryService,
    private toast: ToastifyNotificationsService
  ) { }

  async ngOnInit(): Promise<void> {
    try {    
      const commemorativeID = +this.router.url.split('/').pop();
      this.storyService.stories = [];
      this.deceaseImagesService.deceaseImages = [];
      
      this.commemorative = await this.commemorativeService.getCommemorativeById(commemorativeID);  
      await this.storyService.getCommemorativeStories(+this.router.url.split('/').pop());
      await this.deceaseImagesService.getAllDeceaseImages(commemorativeID)
    } catch (error) {
      console.log(this.commemorative.about);  
      this.commemorative.about === null && this.router.navigate(['/commemorative_list']);
      this.toast.error(error);
    }

    window.addEventListener("scroll", async () => {
      const commemorativeID = +this.router.url.split('/').pop();

      if(
        this.router.url.search('/commemorative/') !== -1 && 
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight
      ){
        try {
          if(this.tabsState === 1){
            await this.deceaseImagesService.getAllDeceaseImages(commemorativeID)
          }

          if(this.tabsState === 2){
            await this.storyService.getCommemorativeStories(commemorativeID);
          }
        } catch (error) {
          this.toast.error(error)
        } 
      } 
    })
  }

  openedTab(tabChangeEvent: MatTabChangeEvent) {
    this.tabsState = tabChangeEvent.index;    
  }
}
