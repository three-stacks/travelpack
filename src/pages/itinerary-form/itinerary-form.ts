import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'page-itinerary-form',
  templateUrl: 'itinerary-form.html',
})
export class ItineraryForm {
  public search: any = { term: '', location: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public yelpSvs: YelpService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryFormPage');
  }

  public backClick(){
    this.navCtrl.push(Chat);
  }

  public submitSearch(){
    this.yelpSvs.fetchYelpData(this.search);
  }
}
