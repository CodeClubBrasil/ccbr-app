import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) { }

  public signup(value) {
    this.storage.set('user', value);
  }
}
