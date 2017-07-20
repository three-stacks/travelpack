import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
  constructor(private storage: Storage, public http: Http) {}
  public jwtHelper : JwtHelper = new JwtHelper();
  public payload : any;
  public headers = new Headers({ 'Content-Type': 'application/json' });

  public loginUser(user, cb) {
    console.log(user);
    this.http.post("http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030/authentication", user)
      .map(res => res.json())
      .subscribe((data) => {
        this.storage.set('jwt', data.accessToken);
        this.storage.get('jwt').then(token => {
          console.log(`your access token is ${token}`)
          this.headers.append("authorization", `Bearer ${this.storage.get('jwt')}`);
          console.log(this.headers);
        });

        this.payload = this.jwtHelper.decodeToken(data.accessToken);
        this.storage.set('userId', this.payload.userId)
        this.storage.get('userId').then((id) => {
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
    this.http.post("http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030/users", user)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, 'data');
      }, (err) => {
        console.error(err);
      });
  }

}
