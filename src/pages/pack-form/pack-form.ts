import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pack-form',
  templateUrl: 'pack-form.html'
})
export class PackForm {
  public packName: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackFormPagePage');
  }
  submitPack() {
    console.log(this.packName)
    this.navCtrl.pop();
  }
  cancelPack(){
    this.navCtrl.pop();
  }

}
