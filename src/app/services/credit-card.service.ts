import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = "https://localhost:44392/api/";
  constructor(private httpClient:HttpClient) { }

  add(creditCard:CreditCard){
    let newPath = this.apiUrl + "creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard); 
  }

  update(creditCard:CreditCard){
    let newPath = this.apiUrl + "creditcards/update";
    return this.httpClient.post<ResponseModel>(newPath,creditCard); 
  }

  delete(creditCard:CreditCard){
    let newPath = this.apiUrl + "creditcards/delete";
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}
