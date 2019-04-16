import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CodeClubApiService } from '../services/api/code-club-api.service';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.page.html',
  styleUrls: ['./register-class.page.scss'],
})
export class RegisterClassPage implements OnInit {
  private createClassForm: FormGroup;
  private newClass: string;
  private codeClub: string;
  private classNameInput: string;
  private chooseClub: string;
  private weekDay: string;
  private shift: string;
  private startsAt: string;
  private endsAt: string;
  private dayNamesAry: string;
  private shiftAry: string;
  private saveNewClass: string;
  private classNameRequiredErrorString: string;
  private clubRequiredErrorString: string;
  private weekDayRequiredErrorString: string;
  private shiftRequiredErrorString: string;
  private startsAtRequiredErrorString: string;
  private endsAtRequiredErrorString: string;

  public validationMessages = {};

  constructor(
    private codeClubApiService: CodeClubApiService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.translateService.get('NEW_CLASS').subscribe(value => {
      this.newClass = value;
    });
    this.translateService.get('CODE_CLUB').subscribe(value => {
      this.codeClub = value;
    });
    this.translateService.get('CLASS_NAME_INPUT').subscribe(value => {
      this.classNameInput = value;
    });
    this.translateService.get('SELECT_CLUB').subscribe(value => {
      this.chooseClub = value;
    });
    this.translateService.get('WEEKDAY').subscribe(value => {
      this.weekDay = value;
    });
    this.translateService.get('SHIFT').subscribe(value => {
      this.shift = value;
    });
    this.translateService.get('STARTS_AT').subscribe(value => {
      this.startsAt = value;
    });
    this.translateService.get('ENDS_AT').subscribe(value => {
      this.endsAt = value;
    });
    this.translateService.get('DAY_NAMES').subscribe(value => {
      this.dayNamesAry = value;
    });
    this.translateService.get('SHIFT_ARY').subscribe(value => {
      this.shiftAry = value;
    });
    this.translateService.get('SAVE_NEW_CLASS').subscribe(value => {
      this.saveNewClass = value;
    });
    this.translateService.get('CLASS_NAME_REQUIRED').subscribe(value => {
      this.classNameRequiredErrorString = value;
    });
    this.translateService.get('CLUB_REQUIRED').subscribe(value => {
      this.clubRequiredErrorString = value;
    });
    this.translateService.get('WEEKDAY_REQUIRED').subscribe(value => {
      this.weekDayRequiredErrorString = value;
    });
    this.translateService.get('SHIFT_REQUIRED').subscribe(value => {
      this.shiftRequiredErrorString = value;
    });
    this.translateService.get('STARTS_AT_REQUIRED').subscribe(value => {
      this.startsAtRequiredErrorString = value;
    });
    this.translateService.get('ENDS_AT_REQUIRED').subscribe(value => {
      this.endsAtRequiredErrorString = value;
    });
  }

  clubs: any;

  ngOnInit() {
    this.getClubs();

    this.createClassForm = this.formBuilder.group({
      className: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      club: new FormControl(
        Validators.compose([
          Validators.required
        ])
      ),
      weekDay: new FormControl(
        Validators.compose([
          Validators.required
        ])
      ),
      shift: new FormControl(
        Validators.compose([
          Validators.required
        ])
      ),
      startsAt: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      endsAt: new FormControl(
        Validators.compose([
          Validators.required
        ])
      )
    });


    this.validationMessages = {
      className: [
        { type: 'required', message: this.classNameRequiredErrorString }
      ],
      club: [
        { type: 'required', message: this.clubRequiredErrorString }
      ],
      weekDay: [
        { type: 'required', message: this.clubRequiredErrorString }
      ],
      shift: [
        { type: 'required', message: this.shiftRequiredErrorString }
      ],
      startsAt: [
        { type: 'required', message: this.startsAtRequiredErrorString }
      ]
    };
  }

  async getClubs() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.codeClubApiService.getClubs().subscribe(res => {
      this.clubs = res;
      loading.dismiss();
    }, err => {
      console.error(err);
      loading.dismiss();
    }
    );
  }

  async logOut(): Promise<void> {
    await this.authService.logoutUser();
    this.router.navigateByUrl('');
  }

  createClass() {
    alert('Hello World!!!');
  }

}
