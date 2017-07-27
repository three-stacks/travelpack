import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,
        ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
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
  public lastImage: string = null;
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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imageData)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
        var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  public uploadImage(form) {
    // Destination URL
    var url = "https://localhost:3030/avatar";
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params : {'fileName': filename},
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    // fileTransfer.upload(targetPath, url, options).then(data => {
    this.http.post('https://api.cloudinary.com/v1_1/djdelgado/image/upload', form)
    .subscribe(data => {
      // this.user.avatar = data.body["secure_url"];
      this.loading.dismissAll();
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll();
      this.presentToast('Error while uploading file.');
    });
  }
  private createFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName =  n + ".jpg";
    return newFileName;
  }
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      var newForm = new FormData();
      newForm.append("file", this.base64Image);
      newForm.append("upload_preset", 'lfgdxmzd');
      this.uploadImage(newForm);
    }, error => {
      this.presentToast('Error while storing file.');
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
