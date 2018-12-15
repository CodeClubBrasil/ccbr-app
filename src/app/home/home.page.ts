import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  private loginForm: FormGroup;
  private matchingPasswordsGroup: FormGroup;

  // private loginErrorString: string;

  private validationMessages = {};

  private emailRequiredErrorString: string;
  private emailValid: string;
  private emailvalidUserMail: string;

  private passwordRequiredErrorString: string;

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
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // });
    this.translateService.get('EMAIL_REQUIRED').subscribe(value => {
      this.emailRequiredErrorString = value;
    });
    this.translateService.get('EMAIL_VALID').subscribe(value => {
      this.emailValid = value;
    });
    this.translateService.get('EMAIL_VALID_USER_MAIL').subscribe(value => {
      this.emailvalidUserMail = value;
    });
    this.translateService.get('PASSWORD_REQUIRED').subscribe(value => {
      this.passwordRequiredErrorString = value;
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
    this.validationMessages = {
      email: [
        { type: 'required', message: this.emailRequiredErrorString },
        { type: 'pattern', message: this.emailValid },
        { type: 'validUseremail', message: this.emailvalidUserMail }
      ],
      password: [
        { type: 'required', message: this.passwordRequiredErrorString }
      ]
    };

    this.matchingPasswordsGroup = new FormGroup(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required
          ])
        ),
      },
    );

    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      matchingPasswords: this.matchingPasswordsGroup
    });
  }

  async doLogin(): Promise<void> {
    if (!this.loginForm.valid) {
      await this.presentAlert();
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.matchingPasswords.password;

      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            // alert('USER LOGGED IN');
            this.router.navigateByUrl('first-access');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertController.create({
              message: error.message,
              buttons: [{ text: this.okButton, role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }
  }
}
