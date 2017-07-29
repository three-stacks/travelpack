import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackingListService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://localhost:3030';
  public userId: string;
  public packID: number;

  constructor(private storage: Storage, public http: Http, public events: Events) {}

  public getList(cb) {
    console.log("it hit getBudget")
    this.storage.get('userId').then(val => {
      this.http.get(`${this.SERVER_DEPLOY}/List?userId=${val}`)
      .map(res => res.json())
      .subscribe(({data}) => {
        console.log(data, 'budget data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }

  public addList(item) {
    this.storage.get('userId').then((val) => {
      let myList = { userId: val, item };
      this.http.post(`${this.SERVER_DEPLOY}/list`, myList)
      .map((res) => res.json())
      .subscribe((data) => {
        console.log(data, 'post budget data');
        if (data) {
          this.events.publish("reload:List");
        }
      }, (err) => {
        console.error(err);
      });
    });
  }

  public removeItem(id) {
    this.http.delete(`${this.SERVER_DEPLOY}/list?id=${id}`)
      .map((res) => res.json())
      .subscribe((data) => {
        console.log(data, 'delete budget data');
        if (data) {
          this.events.publish("reload:List");
        }
      }, (err) => {
        console.error(err);
      });
  }

}
