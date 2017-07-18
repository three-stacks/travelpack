import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  constructor(public http: Http) {}

  public loginUser(user) {
    console.log(user);
    this.http.post('/users', user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
  }

  public signupUser(user) {
    console.log(user);
    this.http.post('/users', user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
  }

}
