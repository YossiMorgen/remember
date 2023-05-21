import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import LanguageModel from 'src/app/models/languages-model';
import { CommemorativeService } from 'src/app/services/commemorative-services/commemorative.service';
import { ConfigService } from 'src/app/utils/config.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-commemorative-form',
  templateUrl: './commemorative-form.component.html',
  styleUrls: ['./commemorative-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CommemorativeFormComponent implements OnInit {
  public language: 'English' | 'Hebrew' = 'English'

  public graveImage: File;
  public deceaseImage: File;

  public graveImageName: string;
  public deceaseImageName: string;

  public childrenNames: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public editMode = false;
  public editedItemIndex: number;

  public languages = Object.values(LanguageModel);

  public basicDataForm = this.formBuilder.group({
    deceasedName: ['', [Validators.required, Validators.minLength(3)]],
    biography: ['', [Validators.required, Validators.minLength(3)]],
    about: ['', [Validators.required, Validators.minLength(3)]],
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
  });

  public graveDataForm = this.formBuilder.group({
    graveYardName: ['', [Validators.required]],
    locationLink: ['', [Validators.required]],
  });


  public constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService,
    public commemorativeService : CommemorativeService,
    private route: ActivatedRoute,
    private config: ConfigService,
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.route.queryParams.subscribe(params => {
      if (params['language'] === 'Hebrew') {
        this.language = 'Hebrew';
      }
    });

    const url = this.router.url;
    this.technicalDataForm.value.partnerType

    if(url.search('edit_commemorative') !== -1){
      this.editMode = true;
      this.editedItemIndex = +url.split('/')[2];

      try {
        const commemorative = await this.commemorativeService.getCommemorativeById(this.editedItemIndex);

        this.basicDataForm.setValue({
          deceasedName: commemorative.deceasedName,
          biography: commemorative.biography,
          about: commemorative.about,
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
        });

        this.graveDataForm.setValue({
          graveYardName: commemorative.graveYardName,
          locationLink: commemorative.locationLink,
        });

        this.deceaseImageName = commemorative.deceaseImageName.slice(this.config.baseUrl.length, commemorative.deceaseImageName.length);
        this.graveImageName = commemorative.graveImageName.slice(this.config.baseUrl.length, commemorative.graveImageName.length);

        this.childrenNames = commemorative.childrenNames.split(',');
      } catch (error) {
        this.toast.error('Error while loading commemorative data!');
        this.router.navigate(['/commemorative_list']);
      }
    }
  }


  public async submit(): Promise<void> {

    const formData = new FormData();
    this.graveImage && formData.append('graveImage', this.graveImage);
    this.deceaseImage && formData.append('deceaseImage', this.deceaseImage);
    formData.append('language', this.language);

    formData.append('graveImageName', this.graveImageName);
    formData.append('deceaseImageName', this.deceaseImageName);

    formData.append('childrenNames', this.childrenNames.join(',') || ' ');

    formData.append('deceasedName', this.basicDataForm.value.deceasedName);
    formData.append('biography', this.basicDataForm.value.biography);
    formData.append('about', this.basicDataForm.value.about);
    formData.append('birthDate', new Date(this.basicDataForm.value.birthDate).toISOString().split('T')[0]);
    formData.append('deathDate', new Date(this.basicDataForm.value.deathDate).toISOString().split('T')[0]);
    formData.append('state', this.technicalDataForm.value.state);
    formData.append('city', this.technicalDataForm.value.city);
    formData.append('partnerType', this.technicalDataForm.value.partnerType);
    formData.append('partnerName', this.technicalDataForm.value.partnerName);
    formData.append('fatherName', this.technicalDataForm.value.fatherName);
    formData.append('motherName', this.technicalDataForm.value.motherName);
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
  }

  addKid(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.childrenNames.push( value );
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeKid(name: string): void {
    const index = this.childrenNames.indexOf(name);

    if (index >= 0) {
      this.childrenNames.splice(index, 1);
    }
  }

  editKid(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeKid(fruit);
      return;
    }

    const index = this.childrenNames.indexOf(fruit);
    if (index >= 0) {
      this.childrenNames[index] = value;
    }
  }

  public pageTexts = {
    title: {
      English: (this.editMode ? 'Edit ' : 'Add ') + 'Commemorative',
      Hebrew: (this.editMode ? 'ערוך ' : 'הוסף ') + 'זיכרון',
    },
    basicDataStep: {
      English: 'Fill out decease info',
      Hebrew: 'מלא את פרטי הנפטר',
    },
    technicalDataStep: {
      English: 'Technical Data',
      Hebrew: 'פרטים טכניים',
    },
    graveDataStep: {
      English: 'Grave Data',
      Hebrew: 'פרטי קבורה',
    },
    deceasedName: {
      English: 'Deceased Name',
      Hebrew: 'שם המת',
    },
    biography: {
      English: 'Biography',
      Hebrew: 'ביוגרפיה',
    },
    about: {
      English: 'About',
      Hebrew: 'אודות',
    },
    deceaseImage: {
      English: 'Decease Image',
      Hebrew: 'תמונת הנפטר',
    },
    birthDate: {
      English: 'Birth Date',
      Hebrew: 'תאריך לידה',
    },
    deathDate: {
      English: 'Death Date',
      Hebrew: 'תאריך פטירה',
    },
    state: {
      English: 'State',
      Hebrew: 'מדינה',
    },
    city: {
      English: 'City',
      Hebrew: 'עיר',
    },
    partnerType: {
      English: 'Partner Type',
      Hebrew: 'הגדרת בן הזוג',
    },
    Wife: {
      English: 'wife',
      Hebrew: 'אישה',
    },
    Husband: {
      English: 'husband',
      Hebrew: 'בעל',
    },
    partnerName: {
      English: 'Partner Name',
      Hebrew: 'שם בן הזוג',
    },
    fatherName: {
      English: 'Father Name',
      Hebrew: 'שם האב',
    },
    motherName: {
      English: 'Mother Name',
      Hebrew: 'שם האם',
    },
    graveYardName: {
      English: 'Grave Yard Name',
      Hebrew: 'שם בית העלמין',
    },
    locationLink: {
      English: 'Location Link',
      Hebrew: 'קישור למיקום',
    },
    childrenNames: {
      English: 'Children Names',
      Hebrew: 'שמות הילדים',
    },
    graveImage: {
      English: 'Grave Image',
      Hebrew: 'תמונת הקבר',
    },
    submit: {
      English: 'Submit',
      Hebrew: 'שלח',
    },
    Next: {
      English: 'Next',
      Hebrew: 'הבא',
    },
    Previous: {
      English: 'Previous',
      Hebrew: 'הקודם',
    },
  }
}
