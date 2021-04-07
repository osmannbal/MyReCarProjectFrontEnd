import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:User;
  constructor(private authService : AuthService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.out();
    this.getUser();
    this.isAuthenticated();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  out(){
    return this.localStorageService.out();
  }

  getUser(){
    this.user.firstName = this.localStorageService.getFirstName();
    this.user.lastName = this.localStorageService.getLastName();
  }
  
}
