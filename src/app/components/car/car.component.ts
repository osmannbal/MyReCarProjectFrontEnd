import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CarDetail } from 'src/app/models/carDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[]=[];
  dataLoaded = false;
  filterText = '';
  key='id';
  reverse=false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['brandId']&&params['colorId']){
        this.getCarsByFilter(params['brandId'],params['colorId']);
      }
      else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  // getRentalId(carId:number){
  //   this.rentalService.getRentalId(carId).subscribe((response)=>{
  //     this.rent
  //   })
  // }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByBrand(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  // addToCart(carDetail:CarDetail) {
  //   this.toastrService.success('Sepete eklendi', carDetail.carName);
  //   this.cartService.addToCart(carDetail);
  // }

  getCarsByFilter(colorId: number, brandId: number) {
    this.carService.getCarsByFilter(colorId, brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  // sort(key: string){
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }
}
