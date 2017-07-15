import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()

export class ContactsService {
  constructor(public alertCtrl: AlertController) {}

  showPrompt() {
    let prompt = this.alertCtrl.create({
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
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data)
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
