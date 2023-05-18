import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import LanguageModel from 'src/app/models/languages-model';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';
type MyFiles = [
  graveImage : File,
  deceaseImage: File
]
@Component({
  selector: 'app-add-commemorative',
  templateUrl: './add-commemorative.component.html',
  styleUrls: ['./add-commemorative.component.css']
})
export class AddCommemorativeComponent {
  public graveImage: File;
  public deceaseImage: File;

  public languages = Object.values(LanguageModel);

  addCommemorativeForm = this.formBuilder.group({
    deceasedName: ['', [Validators.required, Validators.minLength(3)]],
    biography: ['', [Validators.required, Validators.minLength(3)]],
    about: ['', [Validators.required, Validators.minLength(3)]],
    language: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: ['', [Validators.required]],
    deathDate: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    partnerType: ['', [Validators.required]],
    partnerName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    childrenNames: ['', [Validators.required]],
    graveYardName: ['', [Validators.required]],
    locationLink: ['', [Validators.required]],
  });


  public constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService,
    public commemorativeService : CommemorativeService
  ) { }


  public async addCommemorative(): Promise<void> {

    const formData = new FormData();
    formData.append('graveImage', this.graveImage);
    formData.append('deceaseImage', this.deceaseImage);
    formData.append('deceasedName', this.addCommemorativeForm.value.deceasedName);
    formData.append('biography', this.addCommemorativeForm.value.biography);
    formData.append('about', this.addCommemorativeForm.value.about);
    formData.append('language', this.addCommemorativeForm.value.language);
    formData.append('birthDate', this.addCommemorativeForm.value.birthDate);
    formData.append('deathDate', this.addCommemorativeForm.value.deathDate);
    formData.append('state', this.addCommemorativeForm.value.state);
    formData.append('city', this.addCommemorativeForm.value.city);
    formData.append('partnerType', this.addCommemorativeForm.value.partnerType);
    formData.append('partnerName', this.addCommemorativeForm.value.partnerName);
    formData.append('fatherName', this.addCommemorativeForm.value.fatherName);
    formData.append('motherName', this.addCommemorativeForm.value.motherName);
    formData.append('childrenNames', this.addCommemorativeForm.value.childrenNames);
    formData.append('graveYardName', this.addCommemorativeForm.value.graveYardName);
    formData.append('locationLink', this.addCommemorativeForm.value.locationLink);
    
    await this.commemorativeService.addCommemorative(formData);
    
    this.toast.message('Commemorative added successfully!');
    // this.router.navigate(['/commemorative_list']);
  }

  
  public onFileSelected(event: any, name: 'graveImage' | 'deceaseImage'){
    console.log(event.target.files);

    this[name] = event.target.files[0];
    console.log(this[name]);
    
    console.log(this.graveImage);
    console.log(this.deceaseImage);
    
    // for (var i = 0; i < event.target.files.length; i++) { 
    //   this.myFiles.push(event.target.files[i]);
    // }  
  }
}
