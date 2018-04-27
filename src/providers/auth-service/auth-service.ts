import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { RequestOptionsArgs, Headers } from '@angular/http';


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

  // 现在的问题在于，若出现错误，则会出现类型不一致的情况；

  userLogin( userData:any ): Observable<any> {

    let requestOptions: RequestOptionsArgs

    return this.http.post(this.apiUrl, userData)
  }

}
