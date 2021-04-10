import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  colors:Color;
  colorId:number;
  colorName:any;
  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  update(){
    this.colorUpdateForm.patchValue({ colorId : this.colors.colorId})
    if (this.colorUpdateForm.valid) {
      let colorUpdate = Object.assign({}, this.colorUpdateForm.value);
      console.log(colorUpdate)
      this.colorService.update(colorUpdate).subscribe(response => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        responseError => {
          if (responseError.error.ValidationError.length > 0) {
            for (let i = 0; i < responseError.error.ValidationError.length; i++) {
              this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage, 'Doğrulama Hatası');
            }
          }
        }
      ); 
    } else {
      this.toastrService.error('Formunuz eksik');
    }
  }
}
