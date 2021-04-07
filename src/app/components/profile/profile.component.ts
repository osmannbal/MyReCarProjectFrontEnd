import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userUpdateForm:FormGroup;
  constructor(private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  getUser(){
    this.user.firstName = this.localStorageService.getFirstName();
    this.user.lastName = this.localStorageService.getLastName();
    this.user.email = this.localStorageService.getEmail();
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      userId:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  update(){
    
  }
}
