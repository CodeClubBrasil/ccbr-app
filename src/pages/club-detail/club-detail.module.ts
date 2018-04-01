import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ClubDetailPage } from './club-detail';

@NgModule({
  declarations: [
   ClubDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClubDetailPage
  ]
})
export class ClubDetailPageModule { }
