import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-add-commemorative',
  templateUrl: './add-commemorative.component.html',
  styleUrls: ['./add-commemorative.component.css']
})
export class AddCommemorativeComponent {

  commemorativeForm = this.formBuilder.group({
    deceasedName: ['', [Validators.required, Validators.minLength(3)]],
    biography: ['', [Validators.required, Validators.minLength(3)]],
    about: ['', [Validators.required, Validators.minLength(3)]],
    deceaseImage: ['', [Validators.required]],
    language: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    deathDate: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    partnerType: ['', [Validators.required]],
    partnerName: ['', [Validators.required]],
    fatherName: ['', [Validators.required]],
    motherName: ['', [Validators.required]],
    childrenNames: ['', [Validators.required]],
    graveImage: ['', [Validators.required]],
    graveYardName: ['', [Validators.required]],
    locationLink: ['', [Validators.required]],
    flowersAmount: ['', [Validators.required]],
    candlesAmount: ['', [Validators.required]],
  });


  public constructor(
    private router: Router ,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) { }
}
