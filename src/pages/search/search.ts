import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Club } from '../../models/club';
import { ClubProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentClubs: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public clubs: ClubProvider) { }

  
  getClubs(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentClubs = [];
      return;
    }
    this.currentClubs = this.clubs.query({
      name: val
    });
  }

  openItem(club: Club) {
    this.navCtrl.push('ClubDetailPage', {
      club: club
    });
  }

}
