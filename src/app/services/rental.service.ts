import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseMode';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44392/api/';
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "rentals/getrental";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalId(carId:number):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalıd?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+ 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  checkRent(response:any):boolean{
    if(response.data.returnDate != null){
      var returnDateTime = new Date(response.data.returnDate.toString());
      var rentDateTime = new Date(response.data.rentDate.toString());
      var todayTime = new Date(Date.toString());

      if(rentDateTime < todayTime && todayTime < returnDateTime){
        return true;
      }
      else{
        return false;
      } 
    }
    else{
        return false;
      }
  }
}
