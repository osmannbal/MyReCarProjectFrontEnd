import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  colorId: number;
  brandId: number;
  brandName:any;
  colorName:any;
  cars:Car;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
        this.getCarDetailsByCarId(params["carId"])
      }
    })
        
      }
    
  getCarDetailsByCarId(carId: number) {
     this.carService.getCarById(carId).subscribe((response) => {
     this.cars = response.data[0];
     });
    }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      carName: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
    

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  update(){
    this.carUpdateForm.patchValue({ carId: this.cars.carId})
    if (this.carUpdateForm.valid) {
      let carUpdate = Object.assign({}, this.carUpdateForm.value);
      // carUpdate.carId = this.cars.carId
      console.log(carUpdate)
      // carModel.carId=this.carForUpdate.carId
      this.carService.update(carUpdate).subscribe(response => {
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
