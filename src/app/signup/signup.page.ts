import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UseremailValidator } from '../validators/useremail.validator';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public translateService: TranslateService,
    public formBuilder: FormBuilder,
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signUpErrorString = value;
    });
  }
  new_signup_form: FormGroup;
  matching_passwords_group: FormGroup;
  matching_emails_group: FormGroup;

  private signUpErrorString: string;

  validation_messages = {
    'email': [
      { type: 'minlength', message: 'Email must be at least 20 characters long.' },
      { type: 'maxlength', message: 'Email cannot be more than 100 characters long.' },
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' },
      { type: 'validUseremail', message: 'Your email has already been taken.' }
    ],
    'confirm_emails': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_emails': [
      { type: 'areEqual', message: 'Email mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
  };

  ngOnInit() {
    this.matching_emails_group = new FormGroup({
      email: new FormControl('', Validators.compose([
        UseremailValidator.validUseremail,
        Validators.maxLength(100),
        Validators.minLength(20),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      confirm_email: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return UseremailValidator.areEqual(formGroup);
    });

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.new_signup_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      matching_emails: this.matching_emails_group,
      matching_passwords: this.matching_passwords_group,
    });
  }


  signUp(args) {
  }

}
