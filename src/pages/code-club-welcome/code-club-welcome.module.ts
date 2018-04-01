import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeClubWelcome } from './code-club-welcome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CodeClubWelcome,
  ],
  imports: [
    IonicPageModule.forChild(CodeClubWelcome),
    TranslateModule.forChild()
  ],
  exports: [
    CodeClubWelcome
  ]
})
export class CodeClubWelcomeModule { }
