import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
    cardNumber:["",Validators.required],
    cardHolderName:["",Validators.required],
    monthOfExp:["",Validators.required],
    yearOfExp:["",Validators.required],
    cVV:["",Validators.required]
    })
  }


  pay(){
    // let paymentModel = Object.assign(this.paymentForm.value);
    // console.log(paymentModel);
    if(this.paymentForm.valid){
    let paymentModel = Object.assign({}, this.paymentForm.value);
    console.log(paymentModel);
    this.paymentService.pay(paymentModel).subscribe(response=>{
      this.toastrService.success(response.message, "Ödeme başarılı")
    }
    ,responseError=>{
      if(responseError.error.ValidationError.length>0){
        for(let i = 0; i < responseError.error.ValidationError.length; i++){
          this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage, "Doğrulama hatası")
        }
      }
      
    })
  }else{
    this.toastrService.error("Formunuz ekisk", "Dikkat")
  }
  
}
}
