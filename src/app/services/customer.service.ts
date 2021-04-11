import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44392/api/customers/';
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDetail>>{
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl+'getcustomer');
  }

  add(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'add',customer);
  }
}
