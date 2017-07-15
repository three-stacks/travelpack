import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { PackForm } from "../pack-form/pack-form";

@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html'
})
export class Packs {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPagePage');
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(PackForm, {});
    profileModal.present();
  }

  newPack() {
    this.navCtrl.push(PackForm);
  }
  packChat() {
    this.navCtrl.push(Chat);
  }

}
