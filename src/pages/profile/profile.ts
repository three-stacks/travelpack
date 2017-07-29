import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AuthService } from "../../services/auth.service";
import { PackingList } from '../packing-list/packing-list';
import { Flights } from '../flights/flights';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  public user = { avatar: "", username: "" };

  constructor(public storage: Storage,
              public authSvs: AuthService,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.storage.get("avatar").then(val => this.user.avatar = val);
    this.storage.get("username").then(val => this.user.username = val);
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePagePage');
  }

  public logOut() {
    this.authSvs.logoutUser();
    this.navCtrl.setRoot(HomePage);
  }

  public goToPackingList() {
    this.navCtrl.push(PackingList);
  }

  public goToFlights() {
    this.navCtrl.push(Flights);
  }
}
