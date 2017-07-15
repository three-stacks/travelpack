import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-pack-form',
  templateUrl: 'pack-form.html'
})
export class PackForm {
  packName: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.packName = '';
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackFormPagePage');
  }
  submitPack() {
    console.log(this.packName)
    this.navCtrl.pop();
  }
}
