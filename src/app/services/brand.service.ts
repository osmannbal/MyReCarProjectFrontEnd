import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44392/api/";
  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall");
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand); 
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/update";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl+"brands/delete";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
