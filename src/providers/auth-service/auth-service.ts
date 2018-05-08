import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { RequestOptionsArgs, Headers } from '@angular/http';

// interface
import { userData,responseUserData } from '../../shared/interfaces/user.interface';

import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';




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

  //  此处我们应该去引入两个类型，一个是请求从服务器返回的类型用在 this.http.post<> 的尖括号里面， 一个处理过之后的数据类型，放在userLogin 返回的Observable<> 类型的尖括号里面；
  // 除此之外，用户登陆与注册的时候，填写的列表， 也应有其对象类型；

  // JSON.stringfy js对象字面量 转为 json对象， JSON.parse()过程相反；



  userLogin( ): Observable<userData> {

    return this.http.post<responseUserData>(
        this.apiUrl+'login',
        // 此处涉及到json转化的问题；
        {
          "email": "lhx1010339808@outlook.com",
          "password": "lhx583508"
        },{
          headers: {
            "Content-Type": "application/json"
          }
      })
      .pipe(
        map(
          this.toUserData
        ),
        catchError(
          this.handleError
        )
    )
  }

  private toUserData (user: responseUserData) : userData {
    return {
      id: user.userData.id,
      email: user.userData.email,
      token: user.token
    }
  }


  // 错误处理的目的是，当出现错误之后，程序不会崩掉，利用合理的路径，将错误合理的排出；

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `message was ${error.error.message}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
