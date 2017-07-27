import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://localhost:3030';

  constructor(private storage: Storage, public http: Http, public events: Events) {}

  public getPacks(cb) {
    this.storage.get('userId').then(val => {
      console.log(val, 'userId in get');
      this.http.get(`${this.SERVER_DEPLOY}/groups?userId=${val}`)
      .map(res => res.json())
      .subscribe(({data}) => {
        data = data.map((group) => group.pack);
        console.log(data, 'pack data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }

  public addPacks(newPack) {
    this.http.post(`${this.SERVER_DEPLOY}/packs`, newPack)
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

  public addPics(newPic) {
    this.http.post(`${this.SERVER_DEPLOY}/photos`, newPic)
    .map((res) => res.json())
    .subscribe((data) => {
      console.log(data, 'post pack data');
      if (data) {
        this.events.publish("pic:submited");
      }
    }, (err) => {
      console.error(err);
    });
  }

  public getPics(cb) {
    this.storage.get('packId').then(val => {
      this.http.get(`${this.SERVER_DEPLOY}/photos?packId=${val}`)
      .map(res => res.json())
      .subscribe(({data}) => {
        console.log(data, 'pack data');
        cb(data);
      }, (err) => {
        console.error(err);
      });
    });
  }

}
