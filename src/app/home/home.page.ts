import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public router: Router
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
  }
}
