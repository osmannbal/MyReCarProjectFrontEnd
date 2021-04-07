import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rental:Rental[];
  rentalAddForm:FormGroup;
  totalDay: number;
  totalPrice: number;
  currentCar:CarDetail;
  constructor(private rentalService:RentalService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId:["",Validators.required],
      customerId:["", Validators.required],
      rentDate:["", Validators.required],
      returnDate:["", Validators.required]
    })
  }

  rent(){
    if(this.rentalAddForm.valid){
      let rentalModel = Object.assign({},this.rentalAddForm.value)
      console.log(rentalModel)
      this.rentalService.add(rentalModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.router.navigate(['/cars/car-detail/:carId/payments']);
      },responseError=>{
        if(responseError.error.ValidationError.length>0){
          for(let i=0; i< responseError.error.ValidationError.length; i++){
            this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage, "Doğrulama hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    }
    
    calculateAmount(rentDate:Date, returnDate:Date){
      if(this.rentalAddForm.value.rentDate >= this.rentalAddForm.value.returnDate){
        this.toastrService.error("Teslim tarihi kiralama tarihinden önce veya aynı olamaz.");
      }else if(this.rentalAddForm.value.rentDate < Date.now()){
        this.toastrService.error("Bugünden daha önce bir tarih seçemezsiniz");
      }else{
        this.toastrService.success("Başarılı");
        this.totalDay = Math.floor((returnDate.getTime() - rentDate.getTime()) / 1000 / 60 / 60 / 24);
        this.totalPrice = this.totalDay * this.currentCar.dailyPrice;
        
      }
    }

  }
