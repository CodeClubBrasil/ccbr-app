import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterClassPage } from './register-class.page';

import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RegisterClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterClassPage]
})
export class RegisterClassPageModule {}
