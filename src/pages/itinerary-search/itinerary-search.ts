import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Itinerary } from '../itinerary/itinerary';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'page-search-form',
  templateUrl: 'itinerary-search.html',
  providers: [YelpService],
})

export class ItinerarySearch {
  public search: any = { term: '', location: '' };
  public yelpResults: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public yelpSvs: YelpService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryFormPage');
  }

  public backClick(){
    this.navCtrl.push(Itinerary);
  }

  public getYelpData(yelpdata){
    console.log(yelpdata.businesses, 'fetch yelp data');
    if(yelpdata){
      this.yelpResults = yelpdata.businesses;
    }
  }

  public submitSearch(){
    this.yelpSvs.yelpSearch(this.search, this.getYelpData.bind(this));
  }
}
