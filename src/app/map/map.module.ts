import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    MapRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ MapComponent ]
})
export class MapModule { }
