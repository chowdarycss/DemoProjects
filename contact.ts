import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';


import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


    
    constructor(
      public navCtrl: NavController, 
      public cameraPlugin: Camera,
      private file: File, 
      private fileOpener: FileOpener, 
      private socialSharing: SocialSharing) {
   
    }
    takeSelfie(): void {
      this.cameraPlugin.getPicture({
        quality : 95,
        destinationType : this.cameraPlugin.DestinationType.DATA_URL,
        sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(profilePicture => {
        // Send the picture to Firebase Storage
      }, error => {
        // Log an error to the console if something goes wrong.
        console.log("ERROR -> " + JSON.stringify(error));
      });
    }


    //Save Image Function
    saveImg() {
      let imageName = "FreakyJolly.jpg";
      const ROOT_DIRECTORY = 'file:///sdcard//';
      const downloadFolderName = 'tempDownloadFolder';
      
      //Create a folder in memory location
      this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
        .then((entries) => {
   
          //Copy our asset/img/FreakyJolly.jpg to folder we created
          this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
            .then((entries) => {
   
              //Open copied file in device's default viewer
              this.fileOpener.open(ROOT_DIRECTORY + downloadFolderName + "/" + imageName, 'image/jpeg')
                .then(() => console.log('File is opened'))
                .catch(e => alert('Error' + JSON.stringify(e)));
            })
            .catch((error) => {
              alert('error ' + JSON.stringify(error));
            });
        })
        .catch((error) => {
          alert('error' + JSON.stringify(error));
        });
    }
   
    shareImg() { 
      let imageName = "FreakyJolly.jpg";
      const ROOT_DIRECTORY = 'file:///sdcard//';
      const downloadFolderName = 'tempDownloadFolder';
      
      //Create a folder in memory location
      this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
        .then((entries) => {
   
          //Copy our asset/img/FreakyJolly.jpg to folder we created
          this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
            .then((entries) => {
   
              //Common sharing event will open all available application to share
              this.socialSharing.share("Message","Subject", ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
                .then((entries) => {
                  console.log('success ' + JSON.stringify(entries));
                })
                .catch((error) => {
                  alert('error ' + JSON.stringify(error));
                });
            })
            .catch((error) => {
              alert('error ' + JSON.stringify(error));
            });
        })
        .catch((error) => {
          alert('error ' + JSON.stringify(error));
        });
    }
   
   
  }