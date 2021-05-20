import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NavibarComponent } from './components/navibar/navibar.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';

import { CarPipePipe } from './pipes/car-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRentalComponent } from './components/add-rental/add-rental.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';


@NgModule({
  declarations: [
    AppComponent,
    ColorComponent,
    BrandComponent,
    CarComponent,
    RentalComponent,
    CustomerComponent,
    NavibarComponent,
    CardetailComponent,
  
    CarPipePipe,
    ColorPipePipe,
    BrandPipePipe,
    AddRentalComponent,
    PaymentComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass:"toast-bottom-right"}),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
