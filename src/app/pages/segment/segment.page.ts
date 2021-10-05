import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as tfjs  from '@tensorflow/tfjs';
import * as deeplab from '@tensorflow-models/deeplab';
import { LoadingController } from '@ionic/angular';
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
    //private rend : 
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

  async tryseg(img:any){
    const loader = await this.proc.create({
      message: "Processing your image! Please Wait!!",
      spinner: "circles"
    })
    loader.present();
    let mode = this.modeName;

    const loadModel = async () => {
      const modelName = 'pascal';   // set to your preferred model, either `pascal`, `cityscapes` or `ade20k`
      const quantizationBytes = 2;  // either 1, 2 or 4
      return await deeplab.load({base: modelName, quantizationBytes});
    };
    
    //const input = tfjs.zeros([227, 500, 3]);
    // ...
    //const loade = await this._base64ToArrayBuffer(img);
    
    loadModel().then((model) => {
      model.segment(img).then((output) => {
        loader.dismiss();
        this.displaySegmentationMap(this.modeName, output);
      });
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
  console.log(this.canvas)
  const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('output-image');
  const ctx : CanvasRenderingContext2D = canvas.getContext('2d');

  //toggleInvisible('output-card', false);
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
  //toggleInvisible('legend-card', false);


  //const inputContainer = document.getElementById('input-card');
  //inputContainer.scrollIntoView({behavior: 'smooth', block: 'nearest'});
}


}
