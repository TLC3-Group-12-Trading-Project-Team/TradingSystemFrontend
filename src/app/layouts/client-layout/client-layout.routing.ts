import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PortfoliosComponent } from '../../pages/portfolios/portfolios.component';
import { OrdersComponent } from '../../pages/orders/orders.component';

// import { IconsComponent } from '../../pages/icons/icons.component';
// import { MapsComponent } from '../../pages/maps/maps.component';
// import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
// import { TablesComponent } from '../../pages/tables/tables.component';

export const ClientLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'Portfolios',   component: PortfoliosComponent },
    { path: 'Orders',         component: OrdersComponent }
];
