import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()

export class ContactsService {
  constructor(public alertCtrl: AlertController, public http: Http, public storage: Storage) {}
    

  public showPrompt() {
    // this.storage.get('packId').then((val) => this.packID = val);
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
            let contact = { packId: this.storage.get('packId'), username: data.contact };

            console.log(contact, 'is this my data?');
            this.http.post('http://localhost:3030/groups', contact)
              .subscribe((response) => {
                console.log("All good");
              }, (error) => {
                console.error(error, "ERROR");
              });
            console.log('Saved clicked');
          },
        },
      ],
    });
    prompt.present();
  }

}
