import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"rentalDetails", component:RentalComponent, canActivate:[LoginGuard]}, 
  {path:"customers", component:CustomerComponent, canActivate:[LoginGuard]},
  {path:"cars/car-detail/:carId", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"cars/car-detail/:carId/payments", component:PaymentComponent, canActivate:[LoginGuard]}, 
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]}, 
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},    
  {path:"rentals/add", component:RentalAddComponent, canActivate:[LoginGuard]}, 
  {path:"login", component:LoginComponent},     
  {path:"register", component:RegisterComponent},  
  {path:"profile", component:ProfileComponent}, 
  {path:"brands/update/:brandId", component:BrandUpdateComponent, canActivate:[LoginGuard]}, 
  {path:"brands", component:BrandListComponent},
  {path:"colors/update/:colorId", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors", component:ColorListComponent}, 
  {path:"customeradd", component:CustomerAddComponent}    
]; 
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   