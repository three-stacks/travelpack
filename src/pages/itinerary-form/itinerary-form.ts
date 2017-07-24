import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Itinerary } from '../itinerary/itinerary';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'page-itinerary-form',
  templateUrl: 'itinerary-form.html',
})
export class ItineraryForm {
  public search: any = { term: '', location: '' };
  // public yelpResults = [{
  //   name: "Echo Mountain Resort",
  //   image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/gFLGdmU1MylCSrukafisiw/o.jpg",
  //   rating: 4,
  //   price: "$$",
  //   url: "https://www.yelp.com/biz/echo-mountain-resort-idaho-springs?adjust_creative=A40q8l7bgxcZuD3MrjWXbA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=A40q8l7bgxcZuD3MrjWXbA",
  // }]

  constructor(public navCtrl: NavController, public navParams: NavParams, public yelpSvs: YelpService) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryFormPage');
  }

  public backClick(){
    this.navCtrl.push(Itinerary);
  }

  public submitSearch(){
    this.yelpSvs.fetchYelpData(this.search);
  }
}
