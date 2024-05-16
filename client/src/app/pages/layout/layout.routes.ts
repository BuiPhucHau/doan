import { LayoutComponent } from './layout.component';

import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'base/home',
        pathMatch: 'full',
      },
      {
        path: 'base/home',
        loadChildren: () =>
          import('../layout/home/home.routes').then((m) => m.HOME_ROUTERS),
      },
      {
        path: 'base/booking',
        loadChildren: () =>
          import('./booking/booking.routes').then((m) => m.BOOKING_ROUTERS),
      },
      {
        path: 'base/menu',
        loadChildren: () =>
          import('./menu/menu.routes').then((m) => m.MENU_ROUTERS),
      },
      {
        path: 'base/order',
        loadChildren: () =>
          import('./order/order.routes').then((m) => m.ORDER_ROUTERS),
      },
      {
        path: 'base/order/cart',
        loadChildren: () =>
          import('./order/order.routes').then((m) => m.ORDER_ROUTERS),
      },
      {
        path: 'base/location',
        loadChildren: () =>
          import('./location/location.routes').then((m) => m.LOCATION_ROUTES),
      },
      {
        path: 'base/location/detail',
        loadChildren: () =>
          import('./location/detail/detail.routes').then(
            (m) => m.DETAIL_ROUTES
          ),
      },
      // {
      //   path: 'base/location/detail/locationId',
      //   loadChildren: () =>
      //     import('./location/detail/detail.routes').then(
      //       (m) => m.DETAIL_ROUTES
      //     ),
      // },
      {
        path: 'base/booking/locationId',
        loadChildren: () =>
          import('./booking/booking.routes').then(
            (m) => m.BOOKING_ROUTERS
          ),
        },
        {
        path: 'base/location/detail/locationId',
        loadChildren: () =>
          import('./location/detail/detail.routes').then(
            (m) => m.DETAIL_ROUTES
          ),
      },
      // {
      //   path: 'base/booking/locationId',
      //   loadChildren: () =>
      //     import('./booking/booking.routes').then(
      //       (m) => m.BOOKING_ROUTERS
      //     ),
      // },
      {
        path: 'base/new',
        loadChildren: () =>
          import('./new/new.routes').then((m) => m.NEW_ROUTERS),
      },
      {
        path: 'base/admin',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.ADMIN_ROUTERS),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.routes').then((m) => m.LOGIN_ROUTES),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../register/register.routes').then((m) => m.REGISTER_ROUTES),
      },
      {
        path: 'base/menu/dish-detail',
        loadChildren: () =>
          import('../layout/menu/dishdetail/dishdetail.routes').then(
            (m) => m.DISHDETAIL_ROUTERS
          ),
      },
      {
        path: 'base/payments',
        loadChildren: () =>
          import('./payments/payments.routes').then((m) => m.PAYMENTS_ROUTERS),
      },

      {
        path: 'base/contact',
        loadChildren: () =>
          import('./contact/contact.routes').then((m) => m.CONTACT_ROUTERS),
      },

      
    ],
  },
];
