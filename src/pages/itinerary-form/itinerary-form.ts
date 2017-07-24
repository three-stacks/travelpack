import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { YelpService } from '../../services/yelp.service';
import { ItinerarySearch } from '../itinerary-search/itinerary-search';

@Component({
  selector: 'page-itinerary-form',
  templateUrl: 'itinerary-form.html',
})

export class ItineraryForm {
  public date: any;
  public time: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events, 
    public yelpSvs: YelpService) {}

  public backClick(){
    this.navCtrl.push(ItinerarySearch);
  }
}