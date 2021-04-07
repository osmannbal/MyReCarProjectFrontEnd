import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44392/api/'
  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcar"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarById(carId:number):Observable<ListResponseModel<Car>>{
    let nwePath = this.apiUrl + "cars/getbyıd?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(nwePath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getbranddetail?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcolordetail?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByFilter(colorId:number, brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getcarfilter?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+ "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
