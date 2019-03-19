import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile/profile.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CountryPhone } from '../models/country-phone.model';

import { PhoneValidator } from '../../app/validators/phone.validator';
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
  private unitedKingdom: string;
  private unitedStates: string;
  private brazil: string;
  private first_and_last_name: string;
  private first_name: string;
  private last_name: string;
  private new_email: string;
  private your_pwd: string;
  private your_telephone: string;
  private new_pwd: string;
  private old_pwd: string;

  countries: Array<CountryPhone>;

  private country_phone_group: FormGroup;
  public  validations_form: FormGroup;


  constructor(
    private translateService: TranslateService,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.translateService.get('PHONE_REQUIRED').subscribe(value => {
      this.phoneRequiredErrorString = value;
    });
    this.translateService.get('INCORRECT_COUNTRY_PHONE').subscribe(value => {
      this.incorrectCountryPhone = value;
    });
    this.translateService.get('UNITED_KINGDOM').subscribe(value => {
      this.unitedKingdom = value;
    });
    this.translateService.get('UNITED_STATES').subscribe(value => {
      this.unitedStates = value;
    });
    this.translateService.get('BRAZIL').subscribe(value => {
      this.brazil = value;
    });
    this.translateService.get('FIRST_LAST_NAME').subscribe(value => {
      this.first_and_last_name = value;
    });
    this.translateService.get('FIRST_NAME').subscribe(value => {
      this.first_name = value;
    });
    this.translateService.get('LAST_NAME').subscribe(value => {
      this.last_name = value;
    });
    this.translateService.get('NEW_EMAIL').subscribe(value => {
      this.new_email = value;
    });
    this.translateService.get('YOUR_PASSWORD').subscribe(value => {
      this.your_pwd = value;
    });
    this.translateService.get('YOUR_TELEPHONE').subscribe(value => {
      this.your_telephone = value;
    });
    this.translateService.get('NEW_PWD').subscribe(value => {
      this.new_pwd = value;
    });
    this.translateService.get('OLD_PWD').subscribe(value => {
      this.old_pwd = value;
    });
  }

  async ngOnInit() {
    const userProfileSnapshot = await this.profileService.getUserProfile().get();
    this.userProfile = userProfileSnapshot.data();

    this.countries = [
      new CountryPhone('UK', this.unitedKingdom),
      new CountryPhone('US', this.unitedStates),
      new CountryPhone('BR', this.brazil)
    ];

    const country = new FormControl(this.countries[0], Validators.required);
    const phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      country_phone: this.country_phone_group
    });

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
      subHeader: this.first_and_last_name,
      inputs: [
        {
          type: 'text',
          name: 'firstName', placeholder: this.first_name,
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName', placeholder: this.last_name,
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
          await this.profileService.updateName(data.firstName, data.lastName);
          this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();

  }

  async updateEmail() {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: this.new_email },
        { name: 'password', placeholder: this.your_pwd, type: 'password' }, ],
      buttons: [
        { text: 'Cancel' }, {
          text: 'Save',
          handler: async data => {
            try {
              await this.profileService.updateEmail(data.newEmail, data.password);
              console.log('Email Changed Successfully');
            } catch (error) {
              console.log('ERROR: ' + error.message);
            }
            this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }

  async updateTelephone() {
    const alert = await this.alertCtrl.create({
      subHeader: this.your_telephone, inputs: [
        {
          type: 'tel',
          name: 'telephone', placeholder: this.your_telephone,
          value: this.userProfile.telephone,
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
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: this.new_pwd,
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: this.old_pwd,
          type: 'password'
        },
      ], buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
            await this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword);
          },
        },
      ],
    });
    await alert.present();
  }
}
