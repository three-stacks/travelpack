import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
  providers: [ContactsService],
})
export class Contacts {
  public allContacts = [{ username: "David", avatar: ""}];

  constructor(public contactSvs: ContactsService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {}

  public ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPagePage');
  }

  public listContacts(contacts) {
    // this.allContacts = contacts;
  }

  public ionViewDidEnter() {
    this.contactSvs.getContacts(this.listContacts);
  }

}
