import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Contacts } from "../contacts/contacts";
import * as io from "socket.io-client";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  @ViewChild(Content) content: Content;
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public SERVER_ROSE = 'http://localhost:3030';
  public text: string;
  public messages: any = [];
  public socketHost: string = this.SERVER_ROSE;
  public socket: any;
  public chat: any;
  public username: string;
  public avatar: string;
  public zone: any;
  public userId: any;
  public packname: string;
  public packId: number;

  constructor(public storage: Storage,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
    this.storage.get('username').then(val => this.username = val);
    this.storage.get('userId').then(val => this.userId = val);
    this.storage.get('avatar').then(val => this.avatar = val);
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on('chat message', (msg) => {
      console.log(msg, 'in chat message');
      this.zone.run(() => {
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPagePage');
  }
  public ionViewDidEnter() {
    this.storage.get('packName').then(val => this.packname = val);
    this.storage.get('packId').then(id => {
      this.packId = id;
      this.socket.emit('room', id);
    });
  }

  public presentProfileModal() {
    let profileModal = this.modalCtrl.create(Contacts, {});
    profileModal.present();
  }
  public contacts() {
    this.navCtrl.push(Contacts);
  }

  public chatSend(val) {
    let data = {
      message: val,
      userId: this.userId,
      username: this.username,
      avatar: this.avatar,
    };

    this.socket.emit('new message', data);
    this.chat = '';
  }

}
