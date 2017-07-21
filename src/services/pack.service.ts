import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackService {
  constructor(private storage: Storage, public http: Http) {}

  public getPacks(cb) {
    // let headers = new Headers();
    // headers.append("Authorization", `Bearer ${this.storage.get('token')}`);
    this.http.get("http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030/packs")
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
    this.http.post("http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030/packs", newPack)
    .map((res) => res.json())
    .subscribe((data) => {
      console.log(data, 'post pack data');
    }, (err) => {
      console.error(err);
    });
  }
}
