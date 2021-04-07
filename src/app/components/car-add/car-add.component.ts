import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
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
}
