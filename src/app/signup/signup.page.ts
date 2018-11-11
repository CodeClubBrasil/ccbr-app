import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { AuthService } from '../services/authentication/auth.service';
// import { UserService } from '../services/user/user.service';

import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  new_signup_form: FormGroup;
  matching_passwords_group: FormGroup;

  model: User;
  key: string;

  validation_messages = {};

  emailRequiredErrorString: string;
  emailValid: string;
  emailvalidUserMail: string;

  passwordRequiredErrorString: string;
  passwordMinLength: string;
  passwordValid: string;
  passwordMismatch: string;

  confirmPasswordRequired: string;

  warningAlert: string;
  formError: string;
  formErrorMessage: string;
  okButton: string;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController) {
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
    this.translateService.get('WARNING_ALERT').subscribe((value) => {
      this.warningAlert = value;
    });
    this.translateService.get('FORM_ERROR').subscribe((value) => {
      this.formError = value;
    });
    this.translateService.get('FORM_ERROR_MESSAGE').subscribe((value) => {
      this.formErrorMessage = value;
    });
    this.translateService.get('OK_BUTTON').subscribe((value) => {
      this.okButton = value;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.warningAlert,
      subHeader: this.formError,
      message: this.formErrorMessage,
      buttons: [this.okButton]
    });

    await alert.present();
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

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9-!@#$%^&*]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.new_signup_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    });
  }

  doSignup(args) {
    // if (!this.new_signup_form.valid) {
    //   this.presentAlert();
    // } else {
    //   this.userService.insert(args);
    // }
  }

}
