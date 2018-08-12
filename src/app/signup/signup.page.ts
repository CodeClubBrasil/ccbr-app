import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  new_signup_form: FormGroup;

  private signUpErrorString: string;

  constructor(
    public translateService: TranslateService,
    public formBuilder: FormBuilder,
  ) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signUpErrorString = value;
    });
  }

  ngOnInit() {
    this.new_signup_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      confirm_email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signUp(args) {
  }

}
