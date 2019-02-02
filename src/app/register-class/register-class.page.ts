import { Component, OnInit } from '@angular/core'
import { LoadingController } from '@ionic/angular'
import { CodeClubApiService } from '../services/api/code-club-api.service'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.page.html',
  styleUrls: ['./register-class.page.scss'],
})
export class RegisterClassPage implements OnInit {
  private createClassForm: FormGroup

  private className: string

  constructor(
    private codeClubApiService: CodeClubApiService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder
  ) { }

  clubs: any

  ngOnInit() {
    this.getClubs()

    this.createClassForm = this.formBuilder.group({
      className: new FormControl('')
    })

  }

  async getClubs() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    })
    await loading.present()
    await this.codeClubApiService.getClubs()
      .subscribe(res => {
        console.log(res)
        this.clubs = res
        loading.dismiss()
      }, err => {
        console.log(err)
        loading.dismiss()
      }
      )
  }

  createClass() {
    return true
  }

}
