import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  constructor(private storage: Storage, public http: Http) {}

  public loginUser(user, cb) {
    console.log(user);
    this.http.post("http://172.24.3.132:3030/authentication", user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'login data');
        cb(data.accessToken);
        // this.storage.set("token", data.accessToken);
        // let headers = new Headers();
        // headers.append("Authorization", `Bearer ${this.storage.get('token')}`);
      }, (err) => {
        console.error(err);
      });
  }

  public signupUser(user) {
    console.log(user);
    this.http.post("http://172.24.3.132:3030/users", user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
  }

}
