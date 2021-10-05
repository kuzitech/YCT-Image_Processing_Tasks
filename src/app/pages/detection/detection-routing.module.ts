import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectionPage } from './detection.page';

const routes: Routes = [
  {
    path: '',
    component: DetectionPage
  },
  {
    path: 'live',
    loadChildren: () => import('./live/live.module').then( m => m.LivePageModule)
  },
  {
    path: 'direct',
    loadChildren: () => import('./direct/direct.module').then( m => m.DirectPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetectionPageRoutingModule {}
