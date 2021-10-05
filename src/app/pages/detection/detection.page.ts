import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { EnlargeComponent } from 'src/app/enlarge/enlarge.component';
import { OpencamService } from 'src/app/services/opencam.service';
import { RunimagesService } from 'src/app/services/runimages.service';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.page.html',
  styleUrls: ['./detection.page.scss'],
})
export class DetectionPage implements OnInit {

  preview : any;
  static = true;
  staticimg = '../../../assets/images/no-image.png';
  selected = 'coco';
  resultImage: String;
  resultArrived = false;
  resp : any;
  tm : any;
  finalImg : any;
  tags: any;

  constructor(
    private load: RunimagesService, 
    private getimage: OpencamService, 
    private modal : ModalController,
    private proc : LoadingController,
    private alertController: AlertController ) { }

  ngOnInit() {
  }

  async opencam(){
    const img = await this.getimage.getPhoto();
    this.preview = img;
    this.static = false;
    this.processImage(this.preview);
  }

  async enlarge(){
    // const mod = await this.modal.create({
    //   component: EnlargeComponent,
    //   componentProps: {data: {tags: this.tags}},
    //   cssClass: "enlarge_modal"
    // });
    // mod.present();
  }

  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Confirm!',
  //     message: 'Message <strong>text</strong>!!!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

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
      dataset: this.selected
    }
    const unsignedUploadPreset = 'image_task';
    //let tobesha = 'auto_tagging=0.6&detection=coco_v1'
    //+'&timestamp='+data.timestamp+'&upload_preset'+unsignedUploadPreset;
    // await this.load.get({payload: '531695123194584', key: data.crypt}).then((re:any)=>{
    //   key = re.sign;
    //   tm = re.timestamp;
    //   console.log(re,this.tm);
    // })
    
    await this.load.detectImage(a,this.selected).then((res:any)=>{
      console.log(res)
      this.resultImage = res.secure_url;
      this.resultArrived = true;
      this.updateResult(res);
      loader.dismiss();
    },(err:any)=>{
      loader.dismiss();
      console.error(err);
    });

  }

  select(e:any){
    this.selected = e.srcElement.value;
  }


  //'https://res.cloudinary.com/demo/image/upload/$tlx_795/$tly_255/$boxw_50/$boxh_135/$color_!green!/$object_!bottle!/$conf_!0.63!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_401/$tly_755/$boxw_139/$boxh_95/$color_!red!/$object_!cell-phone!/$conf_!0.91!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_171/$tly_763/$boxw_187/$boxh_95/$color_!blue!/$object_!cell-phone!/$conf_!0.99!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_0/$tly_521/$boxw_357/$boxh_193/$color_!orange!/$object_!chair!/$conf_!0.96!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_515/$tly_429/$boxw_620/$boxh_337/$color_!darkgreen!/$object_!laptop!/$conf_!0.99!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_334/$tly_110/$boxw_463/$boxh_564/$color_!darkblue!/$object_!person!/$conf_!1.00!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/v1633103613/docs-obj-ai/qskyalc4ekbbfaoffmi8'

  //'https://res.cloudinary.com/yoricdesigns/image/upload/$tlx_795/$tly_255/$boxw_50/$boxh_135/$color_!green!/$object_!bottle!/$conf_!0.63!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_401/$tly_755/$boxw_139/$boxh_95/$color_!red!/$object_!cell-phone!/$conf_!0.91!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_171/$tly_763/$boxw_187/$boxh_95/$color_!blue!/$object_!cell-phone!/$conf_!0.99!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_0/$tly_521/$boxw_357/$boxh_193/$color_!orange!/$object_!chair!/$conf_!0.96!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_515/$tly_429/$boxw_620/$boxh_337/$color_!darkgreen!/$object_!laptop!/$conf_!0.99!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/$tlx_334/$tly_110/$boxw_463/$boxh_564/$color_!darkblue!/$object_!person!/$conf_!1.00!/$fontsize_18.0/$pix_3.0/$style_!Arial_18.0!/t_bboxup/c_scale,w_700/v1633102749/docs-obj-ai/kn6wxrm7l6ce0fb1x8ii'

  //'g_north_west,l_one_pixel.png,y_$tly,c_scale,x_$tlx,bo_2px_solid_$color,o_0,w_$boxw,h_$boxh'
async updateResult(info) {
  const loadera = await this.proc.create({
    message: "Processed Image is loading! Please Wait!!",
    spinner: "circles"
  })
  loadera.present();
// document.getElementById("annotatedimg").setAttribute("src", info.secure_url);

 var detObj;
 var tlx;
 var tly;
 var boxw;
 var boxh;
 var color;
 var object;
 var conf;
 var pix;
 var fontsize;
 var style;
 var version = info.response.version;
 var pubid = info.response.public_id;
 var height = info.response.height;
 var imgurl = "https://res.cloudinary.com/yoricdesigns/image/upload/";
 var hrefurl = "";
 var trans = "";
 var colors = ["green", "red", "blue", "orange", "darkgreen", "darkblue", "purple", "blueviolet", "cornflowerblue", "dodgerblue", "black", "darkcyan", "darkred", "deeppink", "firebrick", "gray", "indigo", "tomato", "steelblue", "palevioletred"];
 var i = 0;
 var modelObj;
 var detObjNum = '0';
 var namedTrans = "bboxup";
 const resuli = info.response.info;
 this.tags = info.response.tags;

  for (modelObj in resuli.detection.object_detection.data)
  {
    // If tags were found
    if (resuli.detection.object_detection.data[modelObj].tags)
    {
      loop1:
      for (detObj in resuli.detection.object_detection.data[modelObj].tags)
      {
        object = detObj;
        
        for (detObjNum in resuli.detection.object_detection.data[modelObj].tags[detObj])
        {
          conf = resuli.detection.object_detection.data[modelObj].tags[detObj][detObjNum].confidence;
          if(conf.toFixed(2) > 0.55){
            conf = conf.toFixed(2);
            tlx = resuli.detection.object_detection.data[modelObj].tags[detObj][detObjNum]["bounding-box"][0];
            tlx = tlx.toFixed(0);
            tly = resuli.detection.object_detection.data[modelObj].tags[detObj][detObjNum]["bounding-box"][1];
            tly = tly.toFixed(0);
            boxw = resuli.detection.object_detection.data[modelObj].tags[detObj][detObjNum]["bounding-box"][2];
            boxw = boxw.toFixed(0);
            boxh = resuli.detection.object_detection.data[modelObj].tags[detObj][detObjNum]["bounding-box"][3];
            boxh = boxh.toFixed(0);
            color = colors[i];
  
            fontsize = height/50;
            fontsize = fontsize.toFixed(1);
            if (fontsize < 12)
            {
              fontsize = 12;
            }
            pix = fontsize/6;
            pix = pix.toFixed(1);
            style = "Arial_" + fontsize;

            // Use the named transformation that puts the label at the bottom of the box if the name would be out of range
            if (tly - pix - fontsize < 0)
            {
              namedTrans = "bboxdown";
            }
            else
            {
              namedTrans = "bboxup";  
            }
  
            trans = "$tlx_" + tlx + "/$tly_" + tly + "/$boxw_" + boxw + "/$boxh_" + boxh + "/$color_!" + color + "!/$object_!" + object + "!/$conf_!" + conf + "!/$fontsize_" + fontsize + "/$pix_" + pix + "/$style_!" + style + "!/t_" + namedTrans + "/";
  
            imgurl += trans;
  
            i++;
            // Stop at 20 objects
            if (i > 19)
            {
              break loop1;
            }        

          }
          
        }
      }  
    }
  }

  hrefurl = imgurl + "v" + version + "/" + pubid;
  imgurl += "c_scale,w_700/v" + version + "/" + pubid;

  this.finalImg = hrefurl;
  loadera.dismiss();

}

}
