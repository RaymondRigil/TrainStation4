import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModelModule } from "../vis/model/model.module";
import { SortablejsModule } from 'angular-sortablejs';

import { VisComponent } from './vis.component';
import { VisRoutingModule } from './vis-routing.module';

@NgModule({
  imports: [
    VisRoutingModule,
    ChartsModule,
    BsDropdownModule,
	ModelModule,
	SortablejsModule
  ],
  declarations: [ VisComponent ]
})
export class VisModule { }
