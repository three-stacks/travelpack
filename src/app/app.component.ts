import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Packs } from '../pages/packs/packs';
import { Itinerary } from '../pages/itinerary/itinerary';
import { Photos } from '../pages/photos/photos';
import { Budget } from "../pages/budget/budget";
import { FindMyPack } from "../pages/find-my-pack/find-my-pack";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = HomePage;
  public pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, public storage: Storage, public authSvs: AuthService) {
    platform.ready().then(() => { // idk
    });
    this.pages = [
      {title: 'Packs', component: Packs},
      {title: 'Itinerary', component: Itinerary},
      {title: 'Pack Pics', component: Photos},
      {title: 'Budget', component: Budget},
      {title: 'Find My Pack', component: FindMyPack},
    ];
  }

  public openPage(page) {
    this.nav.setRoot(page.component);
  }

}
