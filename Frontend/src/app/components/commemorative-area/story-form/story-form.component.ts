import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import StoryModel from 'src/app/models/commemorative-models/story-model';
import { AuthService } from 'src/app/services/auth.service';
import { StoryService } from 'src/app/services/commemorative-services/story.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  public editMode: boolean = false;

  public storyForm = this.formBuilder.group({
    author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    story: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
  });

  public constructor( 
    public dialogRef: MatDialogRef<StoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public storyIndex: number,
    private formBuilder : FormBuilder,
    private storyService: StoryService,
    public auth: AuthService,
    private toast: ToastifyNotificationsService,
    public router : Router  
  ){}

  ngOnInit(): void {
    console.log(this.storyIndex);
    
    if(this.storyService.stories[this.storyIndex].author){
      
      this.editMode = true;
      this.storyForm.setValue({
        author: this.storyService.stories[this.storyIndex].author,
        story: this.storyService.stories[this.storyIndex].story
      });
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      if(this.editMode){
        const story: StoryModel = {
          storyID: this.storyService.stories[this.storyIndex].storyID,
          commemorativeID: this.storyService.stories[this.storyIndex].commemorativeID,
          userID: this.storyService.stories[this.storyIndex].userID,
          author: this.storyForm.value.author,
          story: this.storyForm.value.story
        }
        await this.storyService.editStory(story);
      } else {
        const story: StoryModel = {
          storyID: 1,
          commemorativeID: +this.router.url.split('/').pop(),
          userID: this.auth.user.userID,
          author: this.storyForm.value.author,
          story: this.storyForm.value.story
        }
        await this.storyService.addStory(story);
      }
      this.dialogRef.close();
    } catch (error) {
      this.toast.error(error);
    }
  }


  onCancel(): void {    
    this.dialogRef.close();
  }
}
