import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarByDetailService } from 'src/app/services/car-by-detail.service';
import { CarImageByDetailService } from 'src/app/services/car-image-by-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails : CarDetail;
  carImages:CarImage[] = [];
  imageUrl = "https://localhost:44392/Images/Car/";
  dataLoaded=false;
  constructor(
    private carByDetailService:CarByDetailService,
    private carImageByDetailService:CarImageByDetailService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"])
        this.getCarImagesById(params["carId"])
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
      console.log("çalıştı2")
    })
  }

  getImagePath(image:string)
  {
    let newImage=image.split("Images/Car");
    let path=newImage[1];
    let newPath=this.imageUrl + path;
    this.dataLoaded=true;
    console.log("çalıştı1")
    return newPath;
    
  }
  
}
