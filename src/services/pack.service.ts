import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PackService {
  constructor(public http: Http) {}

  public getPacks(cb) {
    this.http.get('/packs')
    .map(res => res.json())
    .subscribe((data) => {
      console.log(data, 'data');
      cb([{ name: "Montreal",
        img: "http://s1.picswalls.com/wallpapers/2015/09/27/hd-las-vegas-wall_030837845_281.jpg" }]);
    }, (err) => {
      cb([{ name: "Montreal",
        img: "http://s1.picswalls.com/wallpapers/2015/09/27/hd-las-vegas-wall_030837845_281.jpg" }]);
      console.error(err);
    });
  }
  public addPacks(newPack) {
    this.http.post('/packs', newPack)
    .map((res) => res.json())
    .subscribe((data) => {
      console.log(data, 'data');
    }, (err) => {
      console.error(err);
    });
  }
}
