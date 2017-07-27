import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { Http, Headers } from '@angular/http';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HomePage } from "../home/home";

declare var cordova: any;

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  public user: any = { email: "", username: "", password: "", avatar: ""};
  public lastImage: any = null;
  public base64Image: string;
  public loading: Loading;

  constructor(public authSvs: AuthService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              public http: Http) {}

  public sendToPackPage(data) {
    if (data) {
      this.navCtrl.push(HomePage);
    }
  }

  public signupAuth() {
    this.authSvs.signupUser(this.user, this.sendToPackPage.bind(this));
  }

  public avatarPic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 300,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      // imageData = imageData.replace(/\r?\n|\r/g, "");
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.lastImage = this.base64Image;
      var newForm = new FormData();
      newForm.append("file", this.base64Image);
      newForm.append("upload_preset", 'lfgdxmzd');
      return newForm;
    }).then(form => {
      this.uploadImage(form);
    });
  }
  public uploadImage(form) {
    // Destination URL
    var url = "https://localhost:3030/avatar";
    var testUrl = "http://172.24.3.44:3030/avatar";
    var cloudinaryUpload = 'https://api.cloudinary.com/v1_1/djdelgado/image/upload';

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    this.http.post(cloudinaryUpload, form)
      .subscribe(data => {
        console.log(data);
        // console.log(JSON.parse(data), "THIS IS THE WORLD WE LIVE IN");      
        // this.user.avatar = JSON.parse(data)._body["secure_url"];
        // console.log(JSON.stringify(this.user));          
        this.user.avatar = JSON.parse(data["_body"]).secure_url;
        this.loading.dismissAll();
        this.presentToast('Image succesful uploaded.');
      }, err => {
        console.log(err, "THIS IS POST ERROR");
        this.loading.dismissAll();
        this.presentToast('Error while uploading file.');
      });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

}