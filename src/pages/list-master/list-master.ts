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
  currentClubs: any;

  constructor(public navCtrl: NavController, public clubs: ClubProvider, public modalCtrl: ModalController) {
    this.getClubs()
  }

  private getClubs() {
    this.clubs.query()
    .then(data => {
      this.currentClubs = data
      console.log(this.currentClubs)
    })
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
