import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';
/*
  Generated class for the ItineraryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html'
})
export class Itinerary {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryPagePage');
  }
  backClick(){
    this.navCtrl.push(Chat);
  }
}
