import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/authentication/auth.service';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  private forgotPasswordForm: FormGroup;

  private emailRequiredErrorString: string;
  private emailValid: string;
  private emailvalidUserMail: string;

  private validation_messages = {};

  private warningAlert: string;
  private formError: string;
  private formErrorMessage: string;
  private okButton: string;

  private loading: any;

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.translateService.get('EMAIL_REQUIRED').subscribe(value => {
      this.emailRequiredErrorString = value;
    });
    this.translateService.get('EMAIL_VALID').subscribe(value => {
      this.emailValid = value;
    });
    this.translateService.get('EMAIL_VALID_USER_MAIL').subscribe(value => {
      this.emailvalidUserMail = value;
    });
    this.translateService.get('WARNING_ALERT').subscribe(value => {
      this.warningAlert = value;
    });
    this.translateService.get('FORM_ERROR').subscribe(value => {
      this.formError = value;
    });
    this.translateService.get('FORM_ERROR_MESSAGE').subscribe(value => {
      this.formErrorMessage = value;
    });
    this.translateService.get('OK_BUTTON').subscribe(value => {
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
      email: [
        { type: 'required', message: this.emailRequiredErrorString },
        { type: 'pattern', message: this.emailValid },
        { type: 'validUseremail', message: this.emailvalidUserMail }
      ]
    };

    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
    });
  }

  async doForgotPassword() {
    if (!this.forgotPasswordForm.valid) {
      await this.presentAlert();
    } else {
      const email: string = this.forgotPasswordForm.value.email;

      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertController.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'OK', role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertController.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }
}
