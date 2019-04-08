import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // private createClassForm: FormGroup;

  private newClass: string;
  private codeClub: string;
  private classNameInput: string;
  private chooseClub: string;

  constructor(
    private codeClubApiService: CodeClubApiService,
    public loadingController: LoadingController,
    // private formBuilder: FormBuilder,
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
    })
  }

  clubs: any;

  ngOnInit() {
    this.getClubs();

    // this.createClassForm = this.formBuilder.group({
    //   className: new FormControl(
    //     '',
    //     Validators.compose([
    //       Validators.required
    //     ])
    //   )
    // });
  }

  async getClubs() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.codeClubApiService.getClubs().subscribe(res => {
      console.log(res);
      this.clubs = res;
      loading.dismiss();
    }, err => {
      console.log(err);
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
