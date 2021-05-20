import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/brand/:brandId", component: CarComponent },
  { path: "cars/color/:colorId", component: CarComponent },
  { path: "cars/details/:carId", component: CardetailComponent },
  { path: "cars/brand/:brandId/color/:colorId", component: CarComponent },
  { path: "payment/:rental", component: PaymentComponent },
  { path: "cars/add", component: CarAddComponent },
  { path: "brands/add", component: BrandAddComponent },
  { path: "colors/add", component: ColorAddComponent },
  { path: "cars/update/:carId", component: CarUpdateComponent },
  { path: "brands/update/:brandId", component: BrandUpdateComponent },
  { path: "colors/update/:colorId", component: ColorUpdateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
