import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CodeClubApiService } from '../services/api/code-club-api.service';

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.page.html',
  styleUrls: ['./register-class.page.scss'],
})
export class RegisterClassPage implements OnInit {

  constructor(
    private codeClubApiService: CodeClubApiService,
    public loadingController: LoadingController
  ) { }

  clubs: any;

  ngOnInit() {
    this.getClubs();

  }

  async getClubs() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.codeClubApiService.getClubs()
    .subscribe(res => {
      console.log(res);
      this.clubs = res;
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    }
    );
  }

}
