import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private apiUrl = 'http://192.170.1.38:3000/users/';

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData ( credentials, type ,options) {
    return new Promise((resolve, reject ) => {
      this.http.post(this.apiUrl + type , credentials, options)
    })
  }

}
