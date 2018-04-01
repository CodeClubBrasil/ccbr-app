import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClubProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-club-detail',
  templateUrl: 'club-detail.html'
})
export class ClubDetailPage {
  club: any

  constructor(public navCtrl: NavController, navParams: NavParams, clubs: ClubProvider) {
    this.club = navParams.get('club') || clubs.query();
  }

}
