import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile/profile.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;

  constructor(
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    const userProfileSnapshot = await this.profileService.getUserProfile().get();
    this.userProfile = userProfileSnapshot.data();
  }

  async logOut(): Promise<void> {
    await this.authService.logoutUser();
    this.router.navigateByUrl('');
  }

  async updateName() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName', placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName', placeholder: 'Your last name',
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
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' }, ],
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
      subHeader: 'Your telephone', inputs: [
        {
          type: 'tel',
          name: 'telephone', placeholder: 'Your telephone',
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
          placeholder: 'New password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Old password',
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
