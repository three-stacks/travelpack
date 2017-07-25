import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  providers: [ContactsService],
})
export class Contacts {
  public allContacts = [{ username: "", avatar: ""}];

  constructor(
    public contactSvs: ContactsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public events: Events) {
    events.subscribe("get:contacts", () =>{
      contactSvs.getContacts(this.newContacts.bind(this));
    });
  }
    
  public ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPagePage');
    this.contactSvs.getContacts(this.newContacts.bind(this))
  }

  public newContacts(contacts){
    if(contacts){
      this.allContacts = contacts;
    }
  }

  public listContacts(contacts) {
  }

  public ionViewDidEnter() {
    this.contactSvs.getContacts(this.listContacts);
  }

}
