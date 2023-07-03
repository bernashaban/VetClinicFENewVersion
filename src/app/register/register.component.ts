import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private service: AuthService,
              private router: Router) {


  }

  registerForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    fullName: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    // email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    email: this.builder.control(''),
    phoneNum: this.builder.control('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])),
    role: this.builder.control(''),
    isActive: this.builder.control(false),


  });

  proceedRegistration() {
    if (this.registerForm.valid) {
        this.service.register(this.registerForm.value).subscribe(res => {
          this.toastr.success('Успешна регистрация!');
          this.router.navigate(['login']);
        }, (error: HttpErrorResponse)=>{
          this.toastr.warning("Съществува потребител със същите потребителско име, имейл или телефон. ","Проверете отново!");
        })
      }
     else {
      this.toastr.warning("Некоректни данни!!!");
    }
  }
}

