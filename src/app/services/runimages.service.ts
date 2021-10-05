import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { sha1 } from '@angular/compiler/src/i18n/digest';
import { sha1 } from 'sha.js'

@Injectable({
  providedIn: 'root'
})
export class RunimagesService {
  signaturea: any;

  constructor(private http: HttpClient) { }

  get(a:any): Promise<String>{
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const ural = 'https://kuzitech.com/sunsi001.php';
    //console.log(url, JSON.stringify(data))
    return new Promise ( resolve=>{this.http.post(ural, JSON.stringify(a), options).subscribe((add:any)=>{
        resolve(add);
      })
    })
  }

  sendImage(data:any): Promise<any>{
    return new Promise ( resolve=>{
      
      const cloudName = 'yoricdesigns';
      const unsignedUploadPreset = 'model_fetch';
  
      // *********** Upload file to Cloudinary ******************** //
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            resolve({response: response,status: 999});
          }
        };
  
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'product_image'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', data);
        xhr.send(fd);
    } )
    
    
  }

  async detectImage(data:any, damodel:any): Promise<any>{
    return new Promise ( resolve=>{
      const timestamp = Math.round((new Date).getTime()/1000).toString();
      const kkey = '531695123194584';
      const crypt = 'axspyY0BkIU_velugAEt1yfFaO0';
      const cloudName = 'yoricdesigns';
      const dataset = damodel;
      const unsignedUploadPreset = 'image_task';
      let tobesha = 'auto_tagging=0.6&detection='+dataset+'&timestamp='+timestamp+crypt;
        
      const signature = new sha1().update(tobesha).digest('hex');
      //console.log(signature)
  
      // *********** Upload file to Cloudinary ******************** //
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        //var mode = model;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            resolve({response: response,status: 999});
          }
        };
  
        //fd.append('upload_preset', unsignedUploadPreset);
        //fd.append('tags', 'product_image'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', data);
        fd.append('api_key', kkey);
        fd.append('auto_tagging', '0.6');
        fd.append('detection', dataset);
        fd.append('signature', signature);
        fd.append('timestamp', timestamp);
        xhr.send(fd);
    } )
        
  }

    async enhanceImage(data:any, modela:any): Promise<any>{
    return new Promise ( resolve=>{
      const timestamp = Math.round((new Date).getTime()/1000).toString();
      const kkey = '531695123194584';
      const crypt = 'axspyY0BkIU_velugAEt1yfFaO0';
      const cloudName = 'yoricdesigns';
      const unsignedUploadPreset = 'image_task';
      var model, modelad;
      model = modela == 'jpg' ? "jpegmini" : "viesus_correct";
      modelad = modela == 'jpg' ? "q" : "e";
      let tobesha = 'eager='+modelad+'_'+model+'&timestamp='+timestamp+crypt;
        
      const signature = new sha1().update(tobesha).digest('hex');
      //console.log(signature)
  
      // *********** Upload file to Cloudinary ******************** //
        var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        //var mode = model;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            resolve({response: response,status: 999});
          }
        };
  
        //fd.append('upload_preset', unsignedUploadPreset);
        //fd.append('tags', 'product_image'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', data);
        fd.append('api_key', kkey);
        fd.append("eager", modelad+'_'+model);
        fd.append('signature', signature);
        fd.append('timestamp', timestamp);
        xhr.send(fd);
    } )
        
  }

  Sha1(){
  }
}
