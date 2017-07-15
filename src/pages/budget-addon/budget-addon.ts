import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Budget } from "../budget/budget";


@Component({
  selector: 'page-budget-addon',
  templateUrl: 'budget-addon.html'
})
export class BudgetAddon {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetAddonPagePage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
