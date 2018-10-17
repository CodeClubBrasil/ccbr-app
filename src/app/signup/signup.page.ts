import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UseremailValidator } from '../validators/useremail.validator';
import { PasswordValidator } from '../validators/password.validator';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  new_signup_form: FormGroup;
  matching_passwords_group: FormGroup;
  emails_group: FormGroup;

  validation_messages = {};

  emailRequiredErrorString: string;
  emailValid: string;
  emailvalidUserMail: string;

  passwordRequiredErrorString: string;
  passwordMinLength: string;
  passwordValid: string;
  passwordMismatch: string;

  confirmPasswordRequired: string;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.translateService.get('EMAIL_REQUIRED').subscribe((value) => {
      this.emailRequiredErrorString = value;
    });
    this.translateService.get('EMAIL_VALID').subscribe((value) => {
      this.emailValid = value;
    });
    this.translateService.get('EMAIL_VALID_USER_MAIL').subscribe((value) => {
      this.emailvalidUserMail = value;
    });
    this.translateService.get('PASSWORD_REQUIRED').subscribe((value) => {
      this.passwordRequiredErrorString = value;
    });
    this.translateService.get('PASSWORD_MIN_LENGTH').subscribe((value) => {
      this.passwordMinLength = value;
    });
    this.translateService.get('PASSWORD_VALID').subscribe((value) => {
      this.passwordValid = value;
    });
    this.translateService.get('CONFIRM_PASSWORD_REQUIRED').subscribe((value) => {
      this.confirmPasswordRequired = value;
    });
    this.translateService.get('PASSWORD_MISMATCH').subscribe((value) => {
      this.passwordMismatch = value;
    });
  }

  ngOnInit() {
    this.validation_messages = {
      'email': [
        { type: 'required', message: this.emailRequiredErrorString },
        { type: 'pattern', message: this.emailValid },
        { type: 'validUseremail', message: this.emailvalidUserMail }
      ],
      'password': [
        { type: 'required', message: this.passwordRequiredErrorString },
        { type: 'minlength', message: this.passwordMinLength },
        { type: 'pattern', message: this.passwordValid }
      ],
      'confirm_password': [
        { type: 'required', message: this.confirmPasswordRequired }
      ],
      'matching_passwords': [
        { type: 'areEqual', message: this.passwordMismatch }
      ],
    };

    this.emails_group = new FormGroup({
      email: new FormControl('', Validators.compose([
        UseremailValidator.validUseremail,
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
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
      emails: this.emails_group,
      matching_passwords: this.matching_passwords_group,
    });
  }


  doSignup(args) {
    this.userService.signup(args);
  }

}
