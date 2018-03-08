import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Club } from '../../models/club';
import { ClubProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentClubs: Club[];

  constructor(public navCtrl: NavController, public clubs: ClubProvider, public modalCtrl: ModalController) {
    this.currentClubs = this.clubs.query;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  addClub() {
    let addModal = this.modalCtrl.create('ClubCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.clubs.add(item);
      }
    })
    addModal.present();
  }

  deleteClub(item) {
    this.clubs.delete(item);
  }

  openClub(club: Club) {
    this.navCtrl.push('ClubDetailPage', {
      club: club
    });
  }
}
