import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';

export const ADMIN_ROUTERS: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'post-dish',
        pathMatch: 'full',
      },
      {
        path: 'post-dish',
        loadChildren: () =>
          import('./post-dish/post_dish.routes').then(
            (m) => m.POSTDISH_ROUTES
          ),
      },
      {
        path: 'post-location',
        loadChildren: () =>
          import('./post-location/post_location.routes').then(
            (m) => m.POSTLOCATION_ROUTES
          ),
      },
    ],
  },
];
