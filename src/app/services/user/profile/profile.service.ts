import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateCountry(country: string) {
    return this.userProfile.update({ country });
  }

  updateTelephone(telephone: string): Promise<any> {
    return this.userProfile.update({ telephone });
  }

  async updateEmail(newEmail: string, password: string) {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );

    try {
      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
        await this.currentUser.updateEmail(newEmail);
        this.userProfile.update({ email: newEmail });
    } catch (error) {
      console.error(error);
    }
  }

  async updatePassword(newPassword: string, oldPassword: string) {
    const credential: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );

      await this.currentUser
        .reauthenticateAndRetrieveDataWithCredential(credential);
      await this.currentUser.updatePassword(newPassword);
      this.userProfile.update({ password: newPassword });
  }
}
