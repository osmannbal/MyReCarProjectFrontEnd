import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarByDetailService } from 'src/app/services/car-by-detail.service';
import { CarImageByDetailService } from 'src/app/services/car-image-by-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails : CarDetail;
  rental:RentalDetail;
  carImages:CarImage[] = [];
  imageUrl = "https://localhost:44392/Images";
  dataLoaded=false;
  rentability:Boolean
  constructor(
    private carByDetailService:CarByDetailService,
    private carImageByDetailService:CarImageByDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.getCarImagesById(params["carId"])
        this.getRentalId(params['carId'])
      }
      else if(params["image"]){
        this.getImagePath(params["image"])
      }
      
    })
  }

  getCarsById(carId:number){
    this.carByDetailService.getCarsById(carId).subscribe(response=>{
      this.carDetails = response.data[0]
      this.dataLoaded=true;
    })
  }

  getCarImagesById(carId:number){
    this.carImageByDetailService.getCarImagesById(carId).subscribe(response=>{
      this.carImages=response.data
      this.dataLoaded=true;
    })
  }

  getImagePath(image:string)
  {
    let newImage=image.split("Images");
    let path=newImage[1];
    let newPath=this.imageUrl + path;
    this.dataLoaded=true;
    return newPath;
    
  }

  getRentalId(carId:number){
    this.rentalService.getRentalId(carId).subscribe(response=>{
      if(response.data == null){
        this.rentability = true;
      }else{
        this.rentability = false;
      }
    })
  }

  
  checkAvailability(){
    if(this.rentability){
      return true;
    }else{
      return false;
    }
  }

  // ısRent(carId:number){
  //   this.rentalService.getRentalId(carId).subscribe((response)=>{
  //     this.rentability = this.rentalService.checkRent(response);
  //   },(response)=>{
  //     this.rentability = false;
  //   } );
  // }
  
}
