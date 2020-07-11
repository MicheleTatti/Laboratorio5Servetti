import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

import { shareReplay, filter, tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  redirectUrl: string;

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  private setSession(authResult) {

    const tkn = JSON.parse(atob(authResult.accessToken.split('.')[1]));
    console.log(atob(authResult.accessToken.split('.')[1]));
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('expires_at', tkn.exp);

  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  public isLoggedIn() {
    if(localStorage.getItem('accessToken') == null) return false;
    return moment().isBefore(moment.unix(+localStorage.getItem('expires_at')));
  }

  public isLoggedOut() { return !this.isLoggedIn(); }

}