import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile/profile.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

import { CountryPhone } from '../models/country-phone.model';
// import { PhoneValidator } from '../../app/validators/phone.validator';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  public validation_messages = {};

  private phoneRequiredErrorString: string;
  private incorrectCountryPhone: string;
  private england: string;
  private unitedStates: string;
  private brazil: string;
  private firstAndast_name: string;
  private firstName: string;
  private lastName: string;
  private newEmail: string;
  private yourPwd: string;
  private yourTelephone: string;
  private newPwd: string;
  private oldPwd: string;
  private pwd_min_length: string;
  private pwd_invalid: string;
  private fields_not_empty: string;
  private invalid_email: string;
  public country: string;

  public countries: Array<CountryPhone>;

  constructor(
    private translateService: TranslateService,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) {
    this.translateService.get('PHONE_REQUIRED').subscribe(value => {
      this.phoneRequiredErrorString = value;
    });
    this.translateService.get('INCORRECT_COUNTRY_PHONE').subscribe(value => {
      this.incorrectCountryPhone = value;
    });
    this.translateService.get('ENGLAND').subscribe(value => {
      this.england = value;
    });
    this.translateService.get('UNITED_STATES').subscribe(value => {
      this.unitedStates = value;
    });
    this.translateService.get('BRAZIL').subscribe(value => {
      this.brazil = value;
    });
    this.translateService.get('FIRST_LAST_NAME').subscribe(value => {
      this.firstAndast_name = value;
    });
    this.translateService.get('FIRST_NAME').subscribe(value => {
      this.firstName = value;
    });
    this.translateService.get('LAST_NAME').subscribe(value => {
      this.lastName = value;
    });
    this.translateService.get('NEW_EMAIL').subscribe(value => {
      this.newEmail = value;
    });
    this.translateService.get('YOUR_PASSWORD').subscribe(value => {
      this.yourPwd = value;
    });
    this.translateService.get('YOUR_TELEPHONE').subscribe(value => {
      this.yourTelephone = value;
    });
    this.translateService.get('NEW_PWD').subscribe(value => {
      this.newPwd = value;
    });
    this.translateService.get('OLD_PWD').subscribe(value => {
      this.oldPwd = value;
    });
    this.translateService.get('PASSWORD_MIN_LENGTH').subscribe(value => {
      this.pwd_min_length = value;
    });
    this.translateService.get('PASSWORD_VALID').subscribe(value => {
      this.pwd_invalid = value;
    });
    this.translateService.get('FIELDS_NOT_EMPTY').subscribe(value => {
      this.fields_not_empty = value;
    });
    this.translateService.get('EMAIL_VALID').subscribe(value => {
      this.invalid_email = value;
    });
    this.translateService.get('COUNTRY').subscribe(value => {
      this.country = value;
    });
  }

  async ngOnInit() {
    const userProfileSnapshot = await this.profileService.getUserProfile().get();
    this.userProfile = userProfileSnapshot.data();

    this.countries = [
      new CountryPhone('GB', this.england),
      new CountryPhone('US', this.unitedStates),
      new CountryPhone('BR', this.brazil)
    ];

    // const country = new FormControl(this.countries[0], Validators.required);
    // const phone = new FormControl('', Validators.compose([
    //   Validators.required,
    //   PhoneValidator.validCountryPhone(country)
    // ]));
    // this.country_phone_group = new FormGroup({
    //   country: country,
    //   phone: phone
    // });

    // this.validations_form = this.formBuilder.group({
    //   country_phone: this.country_phone_group
    // });

    this.validation_messages = {
      'phone': [
        { type: 'required', message: this.phoneRequiredErrorString  },
        { type: 'validCountryPhone', message: this.incorrectCountryPhone }
      ]
    };
  }

  async logOut(): Promise<void> {
    await this.authService.logoutUser();
    this.router.navigateByUrl('');
  }

  async updateName() {
    const alert = await this.alertCtrl.create({
      subHeader: this.firstAndast_name,
      inputs: [
        {
          type: 'text',
          name: 'firstName', placeholder: this.firstName,
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName', placeholder: this.lastName,
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
            if (data.firstName === '' || data.lastName === '') {
              this.presentToast(this.fields_not_empty);
            } else {
              await this.profileService.updateName(data.firstName, data.lastName);
              this.ngOnInit();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async updateEmail() {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: this.newEmail },
        { name: 'password', placeholder: this.yourPwd, type: 'password' }, ],
      buttons: [
        { text: 'Cancel' }, {
          text: 'Save',
          handler: async data => {
            const regexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
            if (data.newEmail === '' || data.password === '' ) {
              this.presentToast(this.fields_not_empty);
            } else {
              if (regexp.test(data.newEmail)) {
                try {
                  await this.profileService.updateEmail(data.newEmail, data.password);
                  console.log('Email Changed Successfully');
                } catch (error) {
                  console.error('ERROR: ' + error.message);
                }
              } else {
                this.presentToast(this.invalid_email);
              }
            }
            this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }

  async updateCountry() {
    const alert = await this.alertCtrl.create({
      header: 'Countries',
      inputs: [
        {
          name: 'country',
          type: 'checkbox',
          label: this.countries[0].name,
          value: this.countries[0].name
        },
        {
          name: 'country',
          type: 'checkbox',
          label: this.countries[1].name,
          value: this.countries[1].name
        },
        {
          name: 'country',
          type: 'checkbox',
          label: this.countries[2].name,
          value: this.countries[2].name
        },
      ], buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm cancel!');
          }
        },
        {
          text: 'Save',
          handler: async data => {
            console.log(data);
            await this.profileService.updateCountry(data[0]);
            this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }

  async updateTelephone() {
    const alert = await this.alertCtrl.create({
      subHeader: this.yourTelephone, inputs: [
        {
          type: 'tel',
          name: 'telephone', placeholder: this.yourTelephone,
          value: this.userProfile.telephone
        },
      ], buttons: [
        { text: 'Cancel' }, {
          text: 'Save',
          handler: async data => {
            await this.profileService.updateTelephone(data.telephone);
            this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword() {
    const regexpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9-!@#$%^&*]+$');
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: this.newPwd,
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: this.oldPwd,
          type: 'password'
        },
      ], buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
            try {
              if (data.newPassword === '' || data.oldPassword === '') {
                this.presentToast(this.fields_not_empty);
              } else if (data.newPassword.length < 8) {
                this.presentToast(this.pwd_min_length);
              } else if (!regexpPassword.test(data.newPassword)) {
                this.presentToast(this.pwd_invalid);
              } else {
                await this.profileService.updatePassword(
                  data.newPassword,
                  data.oldPassword);
              }
            } catch (error) {
              console.log(`This is the error message: ${error.message}`);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast(warningMessage: string) {
    const toast = await this.toastCtrl.create({
      message: warningMessage,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
