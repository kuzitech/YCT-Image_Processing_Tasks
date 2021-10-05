import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OpencamService } from 'src/app/services/opencam.service';
import { RunimagesService } from 'src/app/services/runimages.service';

@Component({
  selector: 'app-compress',
  templateUrl: './compress.page.html',
  styleUrls: ['./compress.page.scss'],
})
export class CompressPage implements OnInit {

  preview : any;
  static = true;
  staticimg = '../../../assets/images/no-image.png';
  resultImage: String;
  resultArrived = false;
  resp : any;
  tm : any;
  selected = '';
  finalImg : any;
  tags: any;

  constructor(
    private load: RunimagesService, 
    private getimage: OpencamService, 
    private proc : LoadingController
    ) { }

  ngOnInit() {
  }

  async opencam(){
    const img = await this.getimage.getPhoto();
    this.preview = img;
    this.static = false;
    this.processImage(this.preview);
  }

  async processImage(a:any){
    const loader = await this.proc.create({
      message: "Processing your image! Please Wait!!",
      spinner: "circles"
    })
    loader.present();
    var tm, key;
    const data = {
      timestamp : this.tm, //Math.round((new Date).getTime()/1000).toString(),
      kkey : '531695123194584',
      crypt : 'axspyY0BkIU_velugAEt1yfFaO0',
    }
    const unsignedUploadPreset = 'image_task';
    //let tobesha = 'auto_tagging=0.6&detection=coco_v1'
    //+'&timestamp='+data.timestamp+'&upload_preset'+unsignedUploadPreset;
    // await this.load.get({payload: '531695123194584', key: data.crypt}).then((re:any)=>{
    //   key = re.sign;
    //   tm = re.timestamp;
    //   console.log(re,this.tm);
    // })
    
    await this.load.enhanceImage(a,'jpg').then((res:any)=>{
      console.log(res)
      this.resultArrived = true;
      this.finalImg = res.response.secure_url;
      loader.dismiss();
    },(err:any)=>{
      loader.dismiss();
      console.error(err);
    });

  }  
}