import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ContactsService {
  constructor(public alertCtrl: AlertController, public http: Http) {}

  public showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add new user to Pack',
      message: "Enter the email of the user you wish to add to this Pack",
      inputs: [
        {name: 'contact', placeholder: 'user email'},
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
            this.http.post('http://localhost:3030/contacts', data)
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
