import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44392/api/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl +"colors/getall");
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"colors/update";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  delete(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"colors/delete";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
}
