import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html'
})
export class Itinerary {
  public search: any = { term: '', location: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public yelpSvs: YelpService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryPagePage');
  }

  public backClick(){
    this.navCtrl.push(Chat);
  }

  public submitSearch(){
    this.yelpSvs.fetchYelpData(this.search);
  }
}
