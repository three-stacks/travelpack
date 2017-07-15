import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Packs } from '../pages/packs/packs';
import { Chat } from '../pages/chat/chat';
import { Itinerary } from '../pages/itinerary/itinerary';
import { Photos } from '../pages/photos/photos';
import { PackForm } from "../pages/pack-form/pack-form";
import { Contacts } from "../pages/contacts/contacts";
import { Budget } from "../pages/budget/budget";
import { FindMyPack } from "../pages/find-my-pack/find-my-pack";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Packs,
    Chat,
    Itinerary,
    Photos,
    PackForm,
    Contacts,
    Budget,
    FindMyPack
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Packs,
    Chat,
    Itinerary,
    Photos,
    PackForm,
    Contacts,
    Budget,
    FindMyPack
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
