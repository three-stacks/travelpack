import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { BudgetAddon } from "../budget-addon/budget-addon";

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class Budget {
  public totalCost: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.totalCost = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPagePage');
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(BudgetAddon, {});
    profileModal.present();
  }

  private backClick(){
    this.navCtrl.push(Chat);
  }



}
