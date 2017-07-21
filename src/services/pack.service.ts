import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://172.24.3.132:3030';
  constructor(private storage: Storage, public http: Http, public events: Events) {}

  public getPacks(cb) {
    // let headers = new Headers();
    // headers.append("Authorization", `Bearer ${this.storage.get('token')}`);
    this.http.get(`${this.SERVER_ROSE}/packs`)
    .map(res => res.json())
    .subscribe(({data}) => {
      console.log(data, 'pack data');
      cb(data);
    }, (err) => {
      console.error(err);
    });
  }
  public addPacks(newPack) {
    // let headers;
    // this.storage.get('token').then(val => {
    //   console.log(JSON.stringify(val), "token");
    //   headers = {'authorization': `Bearer ${val}`};
    // });
    // console.log(headers, "headers");
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
