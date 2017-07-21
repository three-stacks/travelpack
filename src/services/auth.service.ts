import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  constructor(public storage: Storage, public http: Http) {}
  public jwtHelper : JwtHelper = new JwtHelper();
  public payload : any;
  public headers = new Headers({ 'Content-Type': 'application/json' });

  public loginUser(user, cb) {
    // console.log(user);
    this.http.post("http://localhost:3030/authentication", user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data.accessToken);
        this.storage.set('jwt', data.accessToken);
        this.storage.get('jwt').then(token => {
          console.log(`your access token is ${token}`)
          this.payload = this.jwtHelper.decodeToken(token);
          console.log(this.payload);
          this.storage.set('userId', this.payload.userId)
          // this.headers.append("authorization", `Bearer ${token} ; charset=utf-8`);
          console.log(this.headers);
        });
        
        this.storage.get('userId').then(id => {
          console.log(`your userId is ${id}`)
        });
        
        cb(data.accessToken);
        // this.storage.set("token", data.accessToken);
        // let headers = new Headers();
        // headers.append("Authorization", `Bearer ${this.storage.get('')}`);
      }, (err) => {
        console.error(err);
      });
  }

  public signupUser(user) {
    console.log(user);
    this.http.post("http://localhost:3030/users", user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
  }

}
