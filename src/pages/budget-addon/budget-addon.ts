import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Budget } from "../budget/budget";

@Component({
  selector: 'page-budget-addon',
  templateUrl: 'budget-addon.html',
})
export class BudgetAddon {
  public budget: any = [];
  public total: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetAddonPagePage');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public submitBud(evt, bdg) {
    console.log(evt + " " + bdg);
  }
}
