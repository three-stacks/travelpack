import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Chat } from "../chat/chat";
import { ChatService } from "../../services/chat.service";
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import * as io from "socket.io-client";
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-find-my-pack',
  templateUrl: 'find-my-pack.html',
})
export class FindMyPack {

  @ViewChild('map') mapElement: ElementRef;
  public SERVER_DEPLOY = 'http://ec2-18-220-15-216.us-east-2.compute.amazonaws.com:3030';
  public socketHost: string = this.SERVER_DEPLOY;
  public socket: any;
  public userId;
  public map: any;
  public gMap: GoogleMap;
  public usersLocations = {};
  //  {
  // Rose: {lat: 30, lng: -90},
  //   TRob: {lat: 30.5, lng: -90.5},
  //   Ali: {lat: 29.8, lng: -90},
  // };

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public geolocation: Geolocation,
              public storage: Storage,
              public chatSvs: ChatService) {
    // this.zone = new NgZone({enableLongStackTrace: false});
    this.storage.get('userId').then(val => this.userId = val);
    this.chatSvs.socket.on('pack locations', (msg) => {
      console.log(msg, 'in location message');
      Object.assign(this.usersLocations, msg);
      this.addMarker(this.usersLocations);
      // this.zone.run(() => {

      // });
    });
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad FindMyPackPagePage');
  }
  public ionViewDidEnter() {
    if (this.platform.is('core')) {
      this.loadBrowserMap();
    } else {
      this.loadMap();
    }
  }

  public backClick() {
    this.navCtrl.push(Chat);
  }

  public loadBrowserMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.storage.get('username').then((val) => {
        this.usersLocations[val] = {lat: position.coords.latitude, lng: position.coords.longitude, userId: this.userId};
        this.locSend({[val]: this.usersLocations[val]});
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker(this.usersLocations);
      });
    }, (err) => {
      console.error(err);
    });
  }

  public addMarker(locals) {
    for (let key in locals) {
      console.log()
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {lat: locals[key].lat, lng: locals[key].lng},
        // position: this.map.getCenter(),
      });

      console.log(this.map);
      let content = `<h4>${key}</h4>`;

      this.addInfoWindow(marker, content);
    };
  }

  public addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  // this map is for native Android use only
  public loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);
      this.storage.get('username').then((val) => {
        this.usersLocations[val] = {lat: position.coords.latitude, lng: position.coords.longitude, userId: this.userId};
        this.locSend({[val]: this.usersLocations[val]});

        this.gMap = new GoogleMap('map', {
          'backgroundColor': 'transparent',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.gMap.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
          let locals = this.usersLocations;

          for (let key in locals) {
            let location = new GoogleMapsLatLng(locals[key].lat, locals[key].lng);
            let markerOptions: GoogleMapsMarkerOptions = {
              position: location,
              title: `${key}`,
            };

            this.gMap.addMarker(markerOptions)
              .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
              });
          };
        });
      });
    }, (err) => {
      console.error(err);
    });
  }

  public androidMarkers(marks){
    
  }

  public locSend(val) {
    console.log(val, 'val');
    this.chatSvs.socket.emit('geolocation', val);
  }

}
