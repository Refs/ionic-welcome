import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ValidatorServiceProvider } from '../../providers/validator-service/validator-service';

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

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public validatorService: ValidatorServiceProvider,
    private fb: FormBuilder) {
      this.buildForm();

  }


  buildForm() {
    this.form = this.fb.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })

    this.form.valueChanges.subscribe(
      (data) => {
        console.log(data);
        // this.validatorForm();
      }
    )
  }

  validatorForm (){

  }

  // get emailControl():FormControl {
  //   return this.form.get('email') as FormControl;
  // }

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

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');

  }
}
