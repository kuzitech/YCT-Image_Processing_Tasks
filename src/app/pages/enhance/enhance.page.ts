import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { OpencamService } from 'src/app/services/opencam.service';
import { RunimagesService } from 'src/app/services/runimages.service';

@Component({
  selector: 'app-enhance',
  templateUrl: './enhance.page.html',
  styleUrls: ['./enhance.page.scss'],
})
export class EnhancePage implements OnInit {

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
  oriSize = '0';
  comSize = '0';
  analysis: { width: any; height: any; format: any; address: any; };
  oriWidth: any;
  oriHeight: any;

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
    const fileSize = await this.getimage.convert(img);
    this.oriSize = (fileSize.size/1024).toFixed(2);
    this.processImage(this.preview);
  }

  async processImage(a:any){
    const loader = await this.proc.create({
      message: "Processing your image! Please Wait!!",
      spinner: "circles"
    })
    loader.present();
    
    await this.load.enhanceImage(a,'eye').then((res:any)=>{
      this.resultArrived = true;
      let naData = { 
        width: res.response.eager[0].width, 
        height: res.response.eager[0].height, 
        format: res.response.eager[0].format,
        address: res.response.eager[0].public_id
      }
      this.analysis = naData;
      this.finalImg = res.response.eager[0].secure_url;
      this.comSize = (res.response.eager[0].bytes/1024).toFixed(2);
      this.oriWidth = res.response.width;
      this.oriHeight = res.response.height;
      loader.dismiss();
    },(err:any)=>{
      loader.dismiss();
      console.error(err);
    });

  }  

  select(e:any){
    this.selected = e.srcElement.value;
  }
}
