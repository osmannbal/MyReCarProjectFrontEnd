import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customerAddForm:FormGroup;
  companyName:string;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
  }
  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      userId: [Number(localStorage.getItem("userId"))],
      companyName: ["", Validators.required]
    })
  }

  add(){
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({},this.customerAddForm.value)
      console.log(customerModel);
      this.customerService.add(customerModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.router.navigate(['/cars'])
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
  

  // add(){
  //   let customer:Customer;
  //   customer = {
  //     userId : this.localStorageService.getUser().userId,
  //     companyName: this.companyName,
  //     customerId : 2,
  //   };
  //   console.log(customer);

  // }

}
