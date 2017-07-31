import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Chat } from "../chat/chat";
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-find-my-pack',
  templateUrl: 'find-my-pack.html',
})
export class FindMyPack {

  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public gMap: GoogleMap;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public geolocation: Geolocation) {}

  public ionViewDidLoad() {
    if (this.platform.is('core')) {
      this.loadBrowserMap();
    } else {
      this.loadMap();
    }
    console.log('ionViewDidLoad FindMyPackPagePage');
  }

  public backClick() {
    this.navCtrl.push(Chat);
  }

  public loadBrowserMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }, (err) => {
      console.error(err);
    });
  }

  public addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
    });

    console.log(this.map);
    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }

  public addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: "TRob Location",
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  public loadMap() {
    let location = new GoogleMapsLatLng(30.9290, -90.6010);

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
    });
  }

}
