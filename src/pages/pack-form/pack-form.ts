import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PackService } from "../../services/pack.service";

@Component({
  selector: 'page-pack-form',
  templateUrl: 'pack-form.html',
})
export class PackForm {
  public packName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pkSvs: PackService) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad PackFormPagePage');
  }
  public submitPack() {
    console.log(this.packName);
    this.pkSvs.addPacks(this.packName);
    this.navCtrl.pop();
  }
  public cancelPack() {
    this.navCtrl.pop();
  }

}
