import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log("passo di qui")
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    var logged = this.authService.isLoggedIn();
    if (logged) { return true; }

    this.authService.redirectUrl = url;

    this.router.navigate(['/home'], { queryParams: { doLogin: true } })

    return false;
  }
}
