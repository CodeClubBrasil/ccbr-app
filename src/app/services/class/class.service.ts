import { Injectable } from '@angular/core'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
 
 

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public class: firebase.firestore.CollectionReference

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.class = firebase.firestore().collection(`userProfile/`)
      }
    })
  }
}
