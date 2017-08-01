import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import * as io from "socket.io-client";
import { Storage } from '@ionic/storage';

@Injectable()

export class ChatService {
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://192.168.1.113:3030';
  public socketHost = this.SERVER_ROSE;
  public userID: string;
  public packID: number;
  public socket = io.connect(this.socketHost);

  constructor(private storage: Storage, public http: Http, public events: Events) {
    this.storage.get('packId').then(val => this.packID = val);
    this.storage.get('userId').then(val => this.userID = val);
  }

  public getMessages(cb){
    this.storage.get('packId').then(val => {
      this.http.get(`${this.SERVER_DEPLOY}/messages?packId=${val}`)
        .map(res => res.json())
        .subscribe(({data}) => {
          console.log(data)
          cb(data);
        }, (err) =>{
          console.error(err);
        });
    })
  }
}