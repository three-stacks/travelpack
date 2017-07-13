import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Packs } from '../pages/packs/packs';
import { Itinerary } from '../pages/itinerary/itinerary';
import { Photos } from '../pages/photos/photos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
    });
    this.pages = [
      {title: 'Packs', component: Packs},
      {title: 'Itinerary', component: Itinerary},
      {title: 'Pack Pics', component: Photos}
    ]
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }
}

