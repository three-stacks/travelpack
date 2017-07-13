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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Packs,
    Chat,
    Itinerary,
    Photos
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
    Photos
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
