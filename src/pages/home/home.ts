import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Packs } from '../packs/packs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  password = '';

  constructor(public navCtrl: NavController) {}
  login(){
    console.log(this.username);
    this.navCtrl.push(Packs);
  }
}
