import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/auth-models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyNotificationsService } from 'src/app/utils/toastify-notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public hideConfirm = true;
  public constructor( 
    public auth: AuthService, 
    private router: Router,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ){}

  public registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.frobiddenEmail.bind(this)],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    birthDate: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.registerForm.addValidators(this.matchPasswords(this.registerForm.get('password'), this.registerForm.get('confirmPassword')))
  }

  public matchPasswords(control: AbstractControl, secondControl: AbstractControl) {
    return () => {
        const isMatch = control.value === secondControl.value
        return isMatch ? null : {noMatch: true};
    }
  }

  public async frobiddenEmail(control: FormControl): Promise<any> {            
    try {
        if(await this.auth.isEmailExist(control.value)){
          return({EmailAlreadyExists: true})
        }else {
          return(null);
        }

    } catch (error: any){
        this.toast.error(error);
    }
  }

  public async register(): Promise<void> {
    try {
      console.log(this.registerForm.value);
      
      await this.auth.register(new User(this.registerForm.value));
      this.toast.success("User registered successfully");
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      this.toast.error(error);
    }
  }
}
