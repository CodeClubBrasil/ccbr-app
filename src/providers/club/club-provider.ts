import { Injectable } from '@angular/core';

import { Club } from '../../models/club';
import { Api } from '../api/api';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClubProvider {
  token:string = '***REMOVED***'
  httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }
  
  constructor(public api: Api) { }
  
  query(params?: any) {
    return this.api.get('clubs', params, this.httpOptions);
  }

  add(club: Club) {
  }

  delete(club: Club) {
  }

}
