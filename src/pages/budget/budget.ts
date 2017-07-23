import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { BudgetAddon } from "../budget-addon/budget-addon";
import { BudgetService } from "../../services/budget.service";

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class Budget {
  public totalCost: number = 0;
  public budget: any = [];

  constructor(public budgetSvs: BudgetService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public events: Events) {
    events.subscribe('reload:budget', () => {
      this.totalCost = 0;
      this.budgetSvs.getBudget(this.listBudget.bind(this));
    });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPagePage');
  }

  public ionViewDidEnter() {
    this.budgetSvs.getBudget(this.listBudget.bind(this));
  }

  public presentProfileModal() {
    let profileModal = this.modalCtrl.create(BudgetAddon, {});
    profileModal.present();
  }

  public listBudget(budg) {
    this.budget = budg;
    this.budget.forEach((obj, i, arr) => {
      if (obj.price) {
        console.log(obj.price);
        this.totalCost += obj.price;
      }
    });
  }
  public backClick() {
    this.navCtrl.push(Chat);
  }

  public removeItem(item) {
    this.budgetSvs.removeBud(item.id);
  }

}
