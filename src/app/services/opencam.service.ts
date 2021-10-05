import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class OpencamService {

  webviewPath: any;

  constructor() { }

  async getPhoto(){
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl, 
      source: CameraSource.Prompt, 
      quality: 100
    });

      this.webviewPath = capturedPhoto.dataUrl
    return this.webviewPath;
  }

  async convert(da){
    const blob = (await (await fetch(da)).blob());
    const file = new File([blob], 'fileName.jpg', {type:"image/jpeg"} )
    return file;
  }
}
