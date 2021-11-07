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
  oriSize = '0';
  comSize = '0';
  oriWidth = '0';
  oriHeight = '0';
  analysis: { width: any; height: any; format: any; address: any; };

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
    let nuImg = new Image();
    nuImg.src = img;
    let webase,wemin, setvalue = 240, ar, nota = ['auto:best','auto:eco','auto:good','auto:low','jpegmini'];
    ar = nuImg.width / nuImg.height;
    if(nota.indexOf(this.selected) == -1){
      webase = (nuImg.width * parseInt(this.selected)) / 100;
      wemin = (nuImg.height * parseInt(this.selected)) / 100;
    } 
    if(webase < setvalue){
      webase = nuImg.width;
      wemin = nuImg.height;
    }
    this.processImage(this.preview,webase,wemin);
  }

  async processImage(a:any,width:any,height:any){
    const loader = await this.proc.create({
      message: "Processing your image! Please Wait!!",
      spinner: "circles"
    })
    loader.present();
    let nuWidth = 'w_'+width, nuHeight = 'h_'+height;
    
    await this.load.compressImage(a,this.selected,nuWidth,nuHeight).then((res:any)=>{
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