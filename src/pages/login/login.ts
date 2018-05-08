import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormControl, FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private fb: FormBuilder) {
      this.buildForm();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');

  }


  buildForm() {
    this.form = this.fb.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  processForm() {
    console.log('processing', this.form);
  }

  login () {
    this.authService.userLogin()
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
              console.log(error);
          }
        )
    // this.navCtrl.push(TabsPage);
  }
}
