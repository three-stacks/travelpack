import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ItinerarySearch } from '../itinerary-search/itinerary-search';
import { YelpService } from '../../services/yelp.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
  providers: [YelpService],
})

export class Itinerary {
  public todos: any;
  public year: any;
  public month: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public yelpSvs: YelpService) {
      events.subscribe("update:like", () => {
        yelpSvs.fetchItinerary(this.getItinerary.bind(this))
      })
    }

  public ionViewWillEnter() {
    console.log('ionViewDidLoad ItineraryPagePage');
      this.yelpSvs.fetchItinerary(this.getItinerary.bind(this))
  }

  public getItinerary(data){
    if(data){ 
      console.log(data, 'before reassigned')
      this.todos = data 
      console.log(this.todos, 'after reassigned')
    }
  }

  public itinerarySearch(){
    this.navCtrl.push(ItinerarySearch);
  }
  public updatePoll(data){
    console.log(data);
    // this.todos = data;
    // for(var i = 0; i < this.todos.length; i++){
    //   if(this.todos[i].id === data.id){
    //     this.todos[i].id = data.id;
    //     console.log(this.todos[i].id)
    //   }
    // }
  }
  public postUnlike(id, unlikes){
    this.yelpSvs.unlike(id, unlikes)
  }
  public postLike(id, likes){
    this.yelpSvs.like(id, likes)
  }
  
  public backClick(){
    this.navCtrl.push(Chat);
  }
}
