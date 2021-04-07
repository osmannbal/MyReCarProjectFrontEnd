import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup;
  brands:Brand;
  brandId:number;
  brandName:any;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getBrands(params["brandId"]);
        this.createBrandUpdateForm();
      }
    })
    
  }

  
  getBrands(brandId:number) {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data[0];
    });
  }
  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
  }

  update(){
    this.brandUpdateForm.patchValue({ brandId : this.brands.brandId})
    if (this.brandUpdateForm.valid) {
      let brandUpdate = Object.assign({}, this.brandUpdateForm.value);
      console.log(brandUpdate)
      this.brandService.update(brandUpdate).subscribe(response => {
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
