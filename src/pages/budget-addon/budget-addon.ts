import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Budget } from "../budget/budget";
import { BudgetService } from "../../services/budget.service";

@Component({
  selector: 'page-budget-addon',
  templateUrl: 'budget-addon.html',
})
export class BudgetAddon {

  constructor(public budgetSvs: BudgetService, 
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetAddonPagePage');
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public submitBud(evt, bdg) {
    console.log(evt + " " + bdg);
    this.budgetSvs.addBudget(evt, bdg);

  }
}
