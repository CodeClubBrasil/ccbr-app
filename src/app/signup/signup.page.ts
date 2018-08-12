import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  private signUpErrorString: string;

  constructor(
    public translateService: TranslateService
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signUpErrorString = value;
    });
  }

  ngOnInit() {
  }

  signUp() {
  }

}
