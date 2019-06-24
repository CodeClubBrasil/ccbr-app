import { Injectable } from '@angular/core';
import { Datetime } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public classesRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.classesRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/class`);
      }
    });
  }

  createClass(
    className: string, codeClub: string, weekDay: string, shift: string,
    startsAt: Datetime, endsAt: Datetime
  ): Promise<firebase.firestore.DocumentReference> {
    return this.classesRef.add(
      {
        name: className,
        club: codeClub,
        weekDay: weekDay,
        shift: shift,
        startsAt: startsAt,
        endsAt: endsAt
      }
    );
  }

  getClassList(): firebase.firestore.CollectionReference {
    return this.classesRef;
  }

  getClassDetail(classId: string): firebase.firestore.DocumentReference {
    return this.classesRef.doc(classId);
  }


}
