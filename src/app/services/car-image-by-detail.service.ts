import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageByDetailService {
  apiUrl = 'https://localhost:44392/api/'
  constructor(private httpClient:HttpClient) { }

  

  getCarImagesById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carImages/getbyımages?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
