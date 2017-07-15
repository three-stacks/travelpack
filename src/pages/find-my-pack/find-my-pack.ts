import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from "../chat/chat";

@Component({
  selector: 'page-find-my-pack',
  templateUrl: 'find-my-pack.html'
})
export class FindMyPack {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindMyPackPagePage');
  }

  backClick() {
    this.navCtrl.push(Chat);
  }
}
