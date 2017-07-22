import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://192.168.1.113:3030';
  public userId: string;

  constructor(private storage: Storage, public http: Http, public events: Events) {
    // this.storage.get('userId').then(val => this.userId = val);
  }

  public getPacks(cb) {
    this.storage.get('userId').then(val => {
      console.log(val, 'userId in get');
      this.http.get(`${this.SERVER_ROSE}/groups?userId=${val}`)
      .map(res => res.json())
      .subscribe(({data}) => {
        console.log(data, 'pack data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }
  public addPacks(newPack) {
    this.http.post(`${this.SERVER_ROSE}/packs`, newPack)
    .map((res) => res.json())
    .subscribe((data) => {
      console.log(data, 'post pack data');
      if (data) {
        this.events.publish("pack:submited");
      }
    }, (err) => {
      console.error(err);
    });
  }

}
