import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserForUpdate } from 'src/app/models/userForUpdate';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserForUpdate;
  userUpdateForm:FormGroup;
  constructor(private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  getUser(){
    this.user.firstName = this.localStorageService.get("firstName");
    this.user.lastName = this.localStorageService.get("lastName");
    this.user.email = this.localStorageService.get("email");
    this.user.password = this.localStorageService.get("password");
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      userId:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      status:true
    })
  }

  update(){
   this.userUpdateForm.patchValue({ userId : Number(this.localStorageService.get("userId"))})
    if (this.userUpdateForm.valid) {
      let userUpdate = Object.assign({}, this.userUpdateForm.value);
      console.log(userUpdate)
      this.authService.update(userUpdate).subscribe(response => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        responseError => {
          if (responseError.error.ValidationError.length > 0) {
            for (let i = 0; i < responseError.error.ValidationError.length; i++) {
              this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage, 'Doğrulama Hatası');
            }
          }
        }
      ); 
    } else {
      this.toastrService.error('Formunuz eksik');
    }
  }
  
}

