import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { MapLayoutComponent } from './map/map-layout.component';
import { TableLayoutComponent } from './table/table-layout.component';
import { VisLayoutComponent } from './vis/vis-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Vis/vis',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule'
      },
      {
        path: 'plugins',
        loadChildren: './plugins/plugins.module#PluginsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'uikits',
        loadChildren: './uikits/uikits.module#UIKitsModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: 'Map',
    component: MapLayoutComponent,
    data: {
      title: 'Map'
    },
    children: [
      {
        path: 'map',
        loadChildren: './map/map.module#MapModule'
      }
    ]
  },
  {
    path: 'Table',
    component: TableLayoutComponent,
    data: {
      title: 'Table'
    },
    children: [
      {
        path: 'table',
        loadChildren: './table/table.module#TableModule'
      }
    ]
  },
  {
    path: 'Vis',
    component: VisLayoutComponent,
    data: {
      title: 'Vis'
    },
    children: [
      {
        path: 'vis',
        loadChildren: './vis/vis.module#VisModule'
      }
	]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
