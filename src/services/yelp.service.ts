import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Events, ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { ItineraryForm } from '../pages/itinerary-form/itinerary-form';

@Injectable()

export class YelpService {
  public packID: number;
  public header = new Headers({ 
  'Access-Control-Allow-Origin': 'http://192.168.1.113:8100',  
  'Content-Type' :'application/x-www-form-urlencoded',
  'Authorization': 'Bearer jhsfakangnalfa',
  });
  public yelp: any;

constructor(
  public navCtrl: NavController, 
  public alertCtrl: AlertController, 
  public http: Http, 
  public storage: Storage, 
  public events: Events, 
  public modalCtrl: ModalController){
  this.storage.get('packId').then((val) => this.packID = val);
}
  
  public g_options = new RequestOptions({
    headers: this.header
  })

  public fetchYelpData(searchQuery){
    console.log(searchQuery,'search query')
        console.log(this.header, 'headers')
    this.http.get(`https://api.yelp.com/v3/businesses/search`, this.g_options )
      .map((res) => res.json())
      .subscribe((response) => {
        console.log(response, 'yelp results');
      }, error => {
        console.error(error);
      }); 
  }

  public addItem(yelpData){
    this.yelp = yelpData;
    // const itineraryModal = this.modalCtrl.create(ItineraryForm);
    // itineraryModal.present()
    const prompt = this.alertCtrl.create({
      title: "Add to your itinerary?",
      message: `Do you want to add ${yelpData.name} to your itinerary?`,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log(this.yelp, 'it works');
          }
        },
      ]
    });
    prompt.present();
  }

  public addYelpData(time){
    console.log(this.yelp, 'insert into database')

  }

    
}
