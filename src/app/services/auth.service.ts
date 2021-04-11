import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseMode';
import { TokenModel } from '../models/tokenModel';
import { UserForUpdate } from '../models/userForUpdate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44392/api/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModel);
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  update(userForUpdate:UserForUpdate){
    return this.httpClient.post<SingleResponseModel<ResponseModel>>(this.apiUrl+"users/update", {
      user:{
        'id': userForUpdate.userId,
        'firstName': userForUpdate.firstName,
        'lastName': userForUpdate.lastName,
        'email': userForUpdate.email,
        'status':userForUpdate.status
      },
      password:userForUpdate.password
    });

  }

  
}
