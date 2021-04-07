import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
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
