import { Component } from '@angular/core';
import { NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { Chat } from "../chat/chat";
import { Storage } from "@ionic/storage";
import { PackService } from "../../services/pack.service";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class Photos {
  public photos = {packId: "", url: ""};
  public gallery: any;
  // [
  //     { name: "Vegas Baby!!",
  //       url: "http://s1.picswalls.com/wallpapers/2015/09/27/hd-las-vegas-wall_030837845_281.jpg" },
  //     { name: "Colorado Trip",
  //       url: "http://trunkweed.com/uploads/posts/images/50923-colorado-mountain.jpg" },
  //     { name: "Panama Beach",
  //       url: "http://cdn.wonderfulengineering.com/wp-content/uploads/2016/01/beach-wallpaper-6.jpg" },
  //     { name: "Vegas Baby!!",
  //       url: "http://s1.picswalls.com/wallpapers/2015/09/27/hd-las-vegas-wall_030837845_281.jpg" },
  //     { name: "Colorado Trip",
  //       url: "http://trunkweed.com/uploads/posts/images/50923-colorado-mountain.jpg" },
  //   ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public events: Events,
              public packSvs: PackService,
              public photoView: PhotoViewer,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController) {
    this.storage.get('packId').then((id) => this.photos.packId = id);
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPagePage');
    this.packSvs.getPics(this.showPics.bind(this));
  }
  public backClick() {
    this.navCtrl.push(Chat);
  }

  public showPics(pics) {
    this.gallery = pics;
  }

  public zoomPic(img) {
    this.photoView.show(img);
  }

  public submitPic() {
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
  //   var options = {
  //     quality: 100,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //     sourceType,
  //     saveToPhotoAlbum: false,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     correctOrientation: true,
  //   };
  //   // Get the data of an image
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.base64Image = 'data:image/jpeg;base64,' + imageData;
  //     // Special handling for Android library
  //   }, (err) => {
  //     this.presentToast('Error while selecting image.');
  //   });
  }

}
