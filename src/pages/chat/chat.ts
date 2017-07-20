import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Contacts } from "../contacts/contacts";
import * as io from "socket.io-client";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  @ViewChild(Content) content: Content;
  public text: string;
  public messages: any = [];
  public socketHost: string = "http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030/";
  public socket: any;
  public chat: any;
  public username: string;
  public zone: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on('chat message', (msg) => {
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
    let data = {
      message: val,
      username: 'david',
    };
    this.socket.emit('new message', data);
    this.chat = '';
  }

}
