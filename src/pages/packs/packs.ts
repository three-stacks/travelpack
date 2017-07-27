import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Chat } from '../chat/chat';
import { PackForm } from "../pack-form/pack-form";
import { PackService } from "../../services/pack.service";

@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html',
})
export class Packs {

  public packNames: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public pkSvs: PackService,
    public events: Events) {
    // this.packNames = [
    //   { name: "Vegas Baby!!",
    //     img: "http://s1.picswalls.com/wallpapers/2015/09/27/hd-las-vegas-wall_030837845_281.jpg" },
    //   { name: "Colorado Trip",
    //     img: "http://trunkweed.com/uploads/posts/images/50923-colorado-mountain.jpg" },
    //   { name: "Panama Beach",
    //     img: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/01/beach-wallpaper-6.jpg" }
    // ];
    events.subscribe("pack:submited", () => {
      pkSvs.getPacks(this.newPacks.bind(this));
    });
  }

  public ionViewDidEnter(){
    console.log('should print after auth service')
    this.pkSvs.getPacks(this.newPacks.bind(this));
  }

  public presentProfileModal() {
    const profileModal = this.modalCtrl.create(PackForm, {});
    profileModal.present();
  }

  public newPacks(packs) {
    if (packs) {
      this.packNames = packs;
    }
  }

  public packChat(pn) {
    this.storage.set('packName', pn.name);
    this.storage.set('packId', pn.id).then(val => {
      console.log(`your pack id is ${val}`);
    });
    this.navCtrl.push(Chat);
  }
}
