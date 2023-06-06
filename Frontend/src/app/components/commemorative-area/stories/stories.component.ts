import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
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
export class StoriesComponent {
  language = this.locale;
  constructor(
    public dialog: MatDialog,
    public storyService: StoryService,
    private router: Router,
    public auth: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    ) { }

  public showDialog(i?: number){
    if(!this.auth.user) {
      this.auth.logout();
      this.router.navigate(['/login']);
      return;
    } 
    

    this.dialog.open(StoryFormComponent, {
      width: '45vh',
      enterAnimationDuration: '300',
      exitAnimationDuration: '200',
      data: i
    });
  }

}
