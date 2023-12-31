import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../service/auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isLoggedIn()) {
      if(route.url.length>0){
        let path=route.url[0].path;
        if(path=='add-appointment'){
          if(this.service.getUserRole()=='ROLE_OWNER'){
            return true;
          }else{
            this.router.navigate(['/']);
            return false;
          }
        }else{
          return true;
        }
      }else{
        return true;
      }

      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }

  }
}
