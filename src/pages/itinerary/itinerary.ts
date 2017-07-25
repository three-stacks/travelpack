import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { ItinerarySearch } from '../itinerary-search/itinerary-search';
import { YelpService } from '../../services/yelp.service';

@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
  providers: [YelpService],
})

export class Itinerary {
  public todos: any = []
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public yelpSvs: YelpService) {
      events.subscribe("unlike:added", () => {
        yelpSvs.fetchItinerary(this.getItinerary.bind(this))
      })
      events.subscribe("like:added", () => {
        yelpSvs.fetchItinerary(this.getItinerary.bind(this))
      })
    }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ItineraryPagePage');
      this.yelpSvs.fetchItinerary(this.getItinerary.bind(this))
  }

  public getItinerary(data){
    if(data){ this.todos = data;
    }
  }
  public itinerarySearch(){
    this.navCtrl.push(ItinerarySearch);
  }
  public updatePoll(data){
    for(var i = 0; i < this.todos.length; i++){
      if(this.todos[i].id === data.id){
        this.todos[i].id = data.id;
        console.log(this.todos[i].id)
      }
    }
  }
  public postUnlike(id, unlikes, cb){
    this.yelpSvs.unlike(id, unlikes, this.updatePoll.bind(this))
  }
  public postLike(id, likes, cb){
    this.yelpSvs.like(id, likes, this.updatePoll.bind(this))
  }
  public updateLikes
  public backClick(){
    this.navCtrl.push(Chat);
  }
}
