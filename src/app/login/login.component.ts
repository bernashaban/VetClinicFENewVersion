import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder,
              private toastr: ToastrService,
              private service: AuthService,
              private router: Router) {
    sessionStorage.clear();
  }

  userData: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getByUsername(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        const isPasswordValid = bcrypt.compareSync(<string>this.loginForm.value.password, this.userData.password)
        if (isPasswordValid) {
          if (this.userData.active) {
            sessionStorage.setItem('username', this.userData.username);
            sessionStorage.setItem('roles', this.userData.roles);
            if (this.userData.roles == "ROLE_OWNER") {
              this.router.navigate(['owner-profile-page']);
            } else if (this.userData.roles == "ROLE_VET") {
              this.router.navigate(['vet-profile-page']);
            } else {
              this.router.navigate(['admin-profile-page']);
            }

          } else {
            this.toastr.error("Свържете се с нас за повече информация.", "Профилът ви е деактивиран!")
          }
        } else {
          this.toastr.error("Грешно потребителско име или парола!")
        }

      })
    }
  }

  onClick() {
    this.router.navigate(['/register']);
  }
}
