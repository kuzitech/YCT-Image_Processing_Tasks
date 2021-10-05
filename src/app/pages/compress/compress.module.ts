import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompressPageRoutingModule } from './compress-routing.module';

import { CompressPage } from './compress.page';
import { JustLightboxModule } from 'just-lightbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustLightboxModule.forRoot({
      // Image paddings in px
      containerOffset: {
          vertical: 20, // Default: 0
          horizontal: 30, // Default: 0
      },
      gesturesEnabled: true, // Pinch zoom & pan gestures. Default: true
      wheelEnabled: true, // Wheel/trackpad zoom & pan. Default: false
      wheelSensitivity: {
          zoom: 10, // Default: 10
          pan: 5, // Default: 5
      }
  }),
    CompressPageRoutingModule
  ],
  declarations: [CompressPage]
})
export class CompressPageModule {}
