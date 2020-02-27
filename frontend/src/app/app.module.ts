import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import { ApiClientService } from './_services/api-client.service';
import { DishComponent } from './common/dish/dish.component';
import { DishesRepository } from './_services/dishes-repository.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatListModule} from '@angular/material/list';
import { IngredientsComponent } from './common/ingredients/ingredients.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OrderStateService } from './_services/order-state.service';
import { OrderComponent } from './order/order.component';
import { OrderGuard } from './_helpers/order.guard';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { AdminOrderPageComponent } from './admin-order-page/admin-order-page.component';
import { OrderInfoCardComponent } from './common/order/order-info-card/order-info-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DishComponent,
    IngredientsComponent,
    OrderComponent,
    AdminOrderPageComponent,
    OrderInfoCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ApiClientService,
    DishesRepository,
    OrderStateService,
    OrderGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
