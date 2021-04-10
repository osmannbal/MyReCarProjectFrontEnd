import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(user:User){
    localStorage.setItem("userId", user.userId.toString());
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
    localStorage.setItem("email", user.email);
    localStorage.setItem("token", user.token);
    localStorage.setItem("expiration", user.expiration);
  }

  getFirstName(){
    return localStorage.getItem("firstName");
  }

  getLastName(){
    return localStorage.getItem("lastName");
  }

  getEmail(){
    return localStorage.getItem("email");
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  out(){
    localStorage.clear();
  }
}
