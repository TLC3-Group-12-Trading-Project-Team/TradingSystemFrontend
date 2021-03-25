import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { ClientLayoutRoutes } from './client-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { PortfoliosComponent } from '../../pages/portfolios/portfolios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    OrdersComponent,
    PortfoliosComponent
  ]
})

export class ClientLayoutModule {}
