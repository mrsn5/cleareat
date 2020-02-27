import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "./login/login.component";
import { OrderComponent } from './order/order.component';
import { OrderGuard } from './_helpers/order.guard';
import {AdminOrderPageComponent} from "./admin-order-page/admin-order-page.component";



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent, canActivate: [OrderGuard, AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [OrderGuard] },
  { path: 'admin', component: AdminOrderPageComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { useHash: true });
