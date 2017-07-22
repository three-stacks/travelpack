import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ContactsService {
  public packID: number;
  constructor(public alertCtrl: AlertController, public http: Http, public storage: Storage, public events: Events) {
    this.storage.get('packId').then((val) => this.packID = val);
  }

  public showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add new user to Pack',
      message: "Enter the email of the user you wish to add to this Pack",
      inputs: [
        {name: 'contact', placeholder: 'username'},
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log(data);
            let contact = { packId: this.packID, username: data.contact };
            console.log(contact, 'contact');
            this.http.post('http://localhost:3030/groups', contact)
              .subscribe((response) => {
                console.log("All good");
                // if(response){ this.events.pubish('get:contacts')}
              }, (error) => {
                console.error(error, "ERROR");
              });
          },
        },
      ],
    });
    prompt.present();
  }

  public getContacts(cb) {
    this.http.get('http://localhost:3030/groups')
      .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        cb(response);
      }, error => {
        console.error(error);
      });
  }

}