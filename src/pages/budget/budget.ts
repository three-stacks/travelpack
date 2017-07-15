import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class Budget {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPagePage');
  }

  backClick(){
    this.navCtrl.push(Chat);
  }

}
