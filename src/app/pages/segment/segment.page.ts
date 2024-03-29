import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as tfjs  from '@tensorflow/tfjs';
import * as deeplab from '@tensorflow-models/deeplab';
import { LoadingController, ToastController } from '@ionic/angular';
import { OpencamService } from 'src/app/services/opencam.service';
import { RunimagesService } from 'src/app/services/runimages.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  @ViewChild('cavas') canvas  : ElementRef <HTMLCanvasElement>;
  @ViewChild('legend') legend : any;

  public ctx : CanvasRenderingContext2D;
  preview : any;
  static = true;
  staticimg = '../../../assets/images/no-image.png';
  selected = 'coco';
  resultImage: String;
  resultArrived = true;
  resp : any;
  tm : any;
  finalImg : any;
  tags: any;
  modeName = 'pascal';

  constructor(
    private load: RunimagesService, 
    private getimage: OpencamService, 
    private proc : LoadingController,
    private rend : ToastController
  ) { }

  ngOnInit() {
    tfjs.setBackend('webgl');
  }

  async opencam(){
    const img = await this.getimage.getPhoto();
    this.preview = img;
    this.static = false;
    var file = new Image();
    file.src = img;
    this.tryseg(file);
  }

  select(a:any){
    this.modeName = a.srcElement.value;
  }

  async tryseg(img:any){
    const loader = await this.proc.create({
      message: "Processing your image! Please Wait!!",
      spinner: "circles"
    })
    loader.present();

    const toast = await this.rend.create({
      message: 'Failed to compile fragment shader. Please try another dataset!',
      position: "top",
      color: 'medium',
      duration: 3000
    })

    const loadModel = async () => {
      const quantizationBytes = 2;  // either 1, 2 or 4
      return await deeplab.load({base: this.modeName, quantizationBytes});
    };
        
    loadModel().then((model) => {
      model.segment(img).then((output) => {
        loader.dismiss();
        this.displaySegmentationMap(this.modeName, output);
      },(error)=>{
        toast.present();
        loader.dismiss();
      });
    },(error)=>{
      toast.present();
      loader.dismiss();
    });            
                

                
    
  }

async displaySegmentationMap (modelName, deeplabOutput) {

  this.resultArrived = true;

  const loader = await this.proc.create({
    message: "Analysing the result! Please Wait!!",
    spinner: "circles"
  })
  loader.present();
  const {legend, height, width, segmentationMap} = deeplabOutput;
  const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('output-image');
  const ctx : CanvasRenderingContext2D = canvas.getContext('2d');

  const segmentationMapData = new ImageData(segmentationMap, width, height);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(segmentationMapData, 0, 0);

  const legendList = document.getElementById('legend');
  while (legendList.firstChild) {
    legendList.removeChild(legendList.firstChild);
  }

  loader.dismiss();

  Object.keys(legend).forEach((label) => {
    const tag = document.createElement('span');
    tag.innerHTML = label;
    const [red, green, blue] = legend[label];
    tag.classList.add('column');
    tag.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    tag.style.padding = '1em';
    tag.style.margin = '1em';
    tag.style.color = '#ffffff';

    legendList.appendChild(tag);
  });

}


}
