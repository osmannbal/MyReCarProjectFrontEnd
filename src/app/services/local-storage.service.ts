import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  currentUser:string = 'currentUser';
  constructor() { }

  // set(user:User){
  //   localStorage.setItem("userId", user.userId.toString());
  //   localStorage.setItem("firstName", user.firstName);
  //   localStorage.setItem("lastName", user.lastName);
  //   localStorage.setItem("email", user.email);
  //   localStorage.setItem("token", user.token);
  //   localStorage.setItem("expiration", user.expiration);
  // }

  // getFirstName(){
  //   return localStorage.getItem("firstName");
  // }

  // getLastName(){
  //   return localStorage.getItem("lastName");
  // }

  // getEmail(){
  //   return localStorage.getItem("email");
  // }

  set(key:string, value:string){
    localStorage.setItem(key, value.toString());
  }

  get(key: string){
    return localStorage.getItem(key);
  }
  // getUser():User{
  //   return JSON.parse(localStorage.getItem(this.currentUser));
  //   // Number(localStorage.getItem(("userId")));
  // }
  
  remove(key:string){
    localStorage.removeItem(key);
  }

  out(){
    localStorage.clear();
  }
}
