import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public insert(user: User) {
    const key = new Date().getTimezoneOffset.toString();
    return this.save(key, user);
  }

  private save(key: string, user: User) {
    // return this.storage.set(key, user);
  }

  public signup(value) {
    // this.storage.set('email', value.email);
    // this.storage.set('password', value.matching_passwords.password);
  }
}
