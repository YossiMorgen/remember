import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import StoryModel from 'src/app/models/commemorative-models/story-model';
import { StoryService } from 'src/app/services/commemorative-services/story.service';
import { StoryFormComponent } from '../story-form/story-form.component';
import { AuthService } from 'src/app/services/auth.service';

type storyData = {author: string, story: string}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  public stories: StoryModel[] = [];

  constructor(
    public dialog: MatDialog,
    public storyService: StoryService,
    private router: Router,
    public auth: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.stories = await this.storyService.getCommemorativeStories(+this.router.url.split('/').pop());
  }

  public showDialog(story?: StoryModel){
    if(!this.auth.user) {
      this.router.navigate(['/login']);
      return;
    } 

    const dialogRef = this.dialog.open(StoryFormComponent, {
      width: '45vh',
      enterAnimationDuration: '300',
      exitAnimationDuration: '200',
      data: {...story}
    });
    dialogRef.afterClosed().subscribe(async (result: StoryModel) => {
      if(result){      
        result.commemorativeID = +this.router.url.split('/').pop();
        result.userID = this.auth.user.userID;    
        await this.storyService.addStory(result);
      }
    });
  }

}
