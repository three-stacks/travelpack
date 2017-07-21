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
  public SERVER_ROSE = 'http://172.24.3.132:3030';
  public text: string;
  public messages: any = [];
  public socketHost: string = this.SERVER_ROSE;
  public socket: any;
  public chat: any;
  public username: string;
  public zone: any;
  public userId: any;

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on('chat message', (msg) => {
      console.log(msg);
      this.zone.run(() => {
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPagePage');
  }

  public presentProfileModal() {
    let profileModal = this.modalCtrl.create(Contacts, {});
    profileModal.present();
  }
  public contacts() {
    this.navCtrl.push(Contacts);
  }

  public chatSend(val) {
    this.storage.get('userId').then(id => {
      console.log(`your userId in chat ${id}`)
      this.userId;
    })
    let data = {
        message: val,
        username: 'david',
        // username: this.userId,
      };

    this.socket.emit('new message', data);
    this.chat = '';
  }

}
