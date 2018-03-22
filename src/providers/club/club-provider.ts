import { Injectable } from '@angular/core';

import { Club } from '../../models/club';
import { Api } from '../api/api';

@Injectable()
export class ClubProvider {

  constructor(public api: Api) { }

  query(params?: any) {
    // It is bringing data from communities because listAllClubs Code Club sandbox route is getting some errors.
    return this.api.get('communities', params);
  }

  add(club: Club) {
  }

  delete(club: Club) {
  }

}
