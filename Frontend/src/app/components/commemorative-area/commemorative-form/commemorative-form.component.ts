import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import LanguageModel from 'src/app/models/languages-model';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-commemorative-form',
  templateUrl: './commemorative-form.component.html',
  styleUrls: ['./commemorative-form.component.css']
})
export class CommemorativeFormComponent implements OnInit {
  public graveImage: File;
  public deceaseImage: File;

  public graveImageName: string;
  public deceaseImageName: string;
  public editMode = false;
  public editedItemIndex: number;

  public languages = Object.values(LanguageModel);

  public basicDataForm = this.formBuilder.group({
    deceasedName: ['', [Validators.required, Validators.minLength(3)]],
    biography: ['', [Validators.required, Validators.minLength(3)]],
    about: ['', [Validators.required, Validators.minLength(3)]],
    language: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: ['', [Validators.required]],
    deathDate: ['', [Validators.required]],
  });

  public technicalDataForm = this.formBuilder.group({
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    partnerType: ['', [Validators.required]],
    partnerName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    childrenNames: ['', [Validators.required]],
  });

  public graveDataForm = this.formBuilder.group({
    graveYardName: ['', [Validators.required]],
    locationLink: ['', [Validators.required]],
  });


  public constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService,
    public commemorativeService : CommemorativeService
  ) { }

  async ngOnInit(): Promise<void> {
    const url = this.router.url;

    if(url.search('edit_commemorative') !== -1){
      this.editMode = true;
      this.editedItemIndex = +url.split('/')[2];

      try {
        const commemorative = await this.commemorativeService.getCommemorativeById(this.editedItemIndex);

        this.basicDataForm.setValue({
          deceasedName: commemorative.deceasedName,
          biography: commemorative.biography,
          about: commemorative.about,
          language: commemorative.language,
          birthDate: commemorative.birthDate,
          deathDate: commemorative.deathDate,
        });

        this.technicalDataForm.setValue({
          state: commemorative.state,
          city: commemorative.city,
          partnerType: commemorative.partnerType,
          partnerName: commemorative.partnerName,
          fatherName: commemorative.fatherName,
          motherName: commemorative.motherName,
          childrenNames: commemorative.childrenNames,
        });

        this.graveDataForm.setValue({
          graveYardName: commemorative.graveYardName,
          locationLink: commemorative.locationLink,
        });

        this.deceaseImageName = commemorative.deceaseImageName;
        this.graveImageName = commemorative.graveImageName;
      } catch (error) {
        this.toast.error('Error while loading commemorative data!');
      }
    }
  }


  public async submit(): Promise<void> {

    const formData = new FormData();
    this.graveImage && formData.append('graveImage', this.graveImage);
    this.deceaseImage && formData.append('deceaseImage', this.deceaseImage);

    formData.append('graveImageName', this.graveImageName);
    formData.append('deceaseImageName', this.deceaseImageName);

    formData.append('deceasedName', this.basicDataForm.value.deceasedName);
    formData.append('biography', this.basicDataForm.value.biography);
    formData.append('about', this.basicDataForm.value.about);
    formData.append('language', this.basicDataForm.value.language);
    formData.append('birthDate', this.basicDataForm.value.birthDate);
    formData.append('deathDate', this.basicDataForm.value.deathDate);
    formData.append('state', this.technicalDataForm.value.state);
    formData.append('city', this.technicalDataForm.value.city);
    formData.append('partnerType', this.technicalDataForm.value.partnerType);
    formData.append('partnerName', this.technicalDataForm.value.partnerName);
    formData.append('fatherName', this.technicalDataForm.value.fatherName);
    formData.append('motherName', this.technicalDataForm.value.motherName);
    formData.append('childrenNames', this.technicalDataForm.value.childrenNames);
    formData.append('graveYardName', this.graveDataForm.value.graveYardName);
    formData.append('locationLink', this.graveDataForm.value.locationLink);
    
    if(this.editMode){
      try {
        await this.commemorativeService.updateCommemorative( formData, this.editedItemIndex );
        this.toast.message('Commemorative edited successfully!');
        this.router.navigate(['/commemorative_list']);
      } catch (error) {
        this.toast.error('Error while editing commemorative!');
      }
      return;
    }
    await this.commemorativeService.addCommemorative(formData);
    this.toast.message('Commemorative added successfully!');
    this.router.navigate(['/commemorative_list']);
  }

  
  public onFileSelected(event: any, name: 'graveImage' | 'deceaseImage'){
    console.log(event.target.files);

    this[name] = event.target.files[0];
    console.log(this[name]);
    
    console.log(this.graveImage);
    console.log(this.deceaseImage); 
  }
}
