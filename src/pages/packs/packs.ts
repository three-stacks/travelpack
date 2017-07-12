import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';

@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html'
})
export class Packs {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPagePage');
  }
  newPack() {
    console.log('new pack');
  }
  packChat() {
    this.navCtrl.push(Chat);
  }

}
