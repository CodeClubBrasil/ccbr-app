import { Injectable } from '@angular/core';

import { Club } from '../../models/club';
import { Api } from '../api/api';

@Injectable()
export class ClubProvider {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/clubs', params);
  }

  add(club: Club) {
  }

  delete(club: Club) {
  }

}
