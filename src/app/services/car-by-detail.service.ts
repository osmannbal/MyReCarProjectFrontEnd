import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarByDetailService {
  apiUrl = 'https://localhost:44392/api/'
  constructor(private httpClient:HttpClient) { }

  getCarsById(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =  this.apiUrl + "cars/getcardetail?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
