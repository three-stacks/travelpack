import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class BudgetService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://192.168.1.113:3030';
  public userId: string;
  public packID: number;

  constructor(private storage: Storage, public http: Http, public events: Events) {}

  public getBudget(cb) {
    console.log("it hit getBudget")
    this.storage.get('packId').then(val => {
      this.http.get(`${this.SERVER_ROSE}/budgets?packId=${val}`)
      .map(res => res.json())
      .subscribe(({data}) => {
        console.log(data, 'budget data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }

  public addBudget(ev, budg) {
    this.storage.get('packId').then((val) => {
      let myBudget = { packId: val, event: ev, price: budg };
      this.http.post(`${this.SERVER_ROSE}/budgets`, myBudget)
      .map((res) => res.json())
      .subscribe((data) => {
        console.log(data, 'post budget data');
        if (data) {
          this.events.publish("reload:budget");
        }
      }, (err) => {
        console.error(err);
      });
    });
  }

  public removeBud(id) {
    this.http.delete(`${this.SERVER_ROSE}/budgets?id=${id}`)
      .map((res) => res.json())
      .subscribe((data) => {
        console.log(data, 'delete budget data');
        if (data) {
          this.events.publish("reload:budget");
        }
      }, (err) => {
        console.error(err);
      });
  }

}
