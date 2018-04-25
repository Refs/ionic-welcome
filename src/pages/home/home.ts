import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }

  Logout () {
    // 直接去调用navCtrl 获取的只是最近的 NavController 即 tabs 而我们是想切回到 welcome 页面，而不是在tabs 中来回转；
    // this.navCtrl.push()
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
