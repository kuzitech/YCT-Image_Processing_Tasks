import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompressPage } from './compress.page';

const routes: Routes = [
  {
    path: '',
    component: CompressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompressPageRoutingModule {}
