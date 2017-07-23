import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';


@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html'
})

export class Itinerary {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryPagePage');
  }

  public backClick(){
    this.navCtrl.push(Chat);
  }
}
