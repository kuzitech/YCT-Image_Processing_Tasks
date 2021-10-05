import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detection',
    loadChildren: () => import('./pages/detection/detection.module').then( m => m.DetectionPageModule)
  },
  {
    path: 'segment',
    loadChildren: () => import('./pages/segment/segment.module').then( m => m.SegmentPageModule)
  },
  {
    path: 'augment',
    loadChildren: () => import('./pages/augment/augment.module').then( m => m.AugmentPageModule)
  },
  {
    path: 'compress',
    loadChildren: () => import('./pages/compress/compress.module').then( m => m.CompressPageModule)
  },
  {
    path: 'enhance',
    loadChildren: () => import('./pages/enhance/enhance.module').then( m => m.EnhancePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
