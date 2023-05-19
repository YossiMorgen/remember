import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import StoryModel from 'src/app/models/commemorative-models/story-model';
import { AuthService } from 'src/app/services/auth.service';
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
    @Inject(MAT_DIALOG_DATA) public story: StoryModel,
    private formBuilder : FormBuilder,
    public auth: AuthService,
    private toast: ToastifyNotificationsService,
    public router : Router  
  ){}

  ngOnInit(): void {
    if(this.story.author){
      this.editMode = true;
      this.storyForm.setValue({
        author: this.story.author,
        story: this.story.story
      });
    }
  }

  onCancel(): void {    
    this.dialogRef.close();
  }
}
