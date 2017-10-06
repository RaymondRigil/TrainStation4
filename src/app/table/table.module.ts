import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';

@NgModule({
  imports: [
    TableRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ TableComponent ]
})
export class TableModule { }
