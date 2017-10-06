import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisComponent } from './vis.component';

const routes: Routes = [
  {
    path: '',
    component: VisComponent,
    data: {
      title: 'Vis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisRoutingModule {}
