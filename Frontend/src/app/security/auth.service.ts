import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'; 
import { GlobalsService } from '../utilities/globalvars/globals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient : HttpClient,private vars : GlobalsService,private route:Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  login(username: string, password: string) {
    let u : User = new User();
    return this.httpClient.post<any>(this.vars.urlAddress + ':8082/authenticate', { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.jwt) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                u.id = user.iduser;
                u.token = user.jwt;
                u.password = user.password;
                u.username = user.username;
                u.role = user.authorities[0].authority;
                localStorage.setItem('currentUser', JSON.stringify(u));
                this.currentUserSubject.next(u);
            }
            return u;
        })) ;
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null!);
  window.location.reload();
}
/*
  login(data: any) {
    return this.httpClient.post<{jwt :  string,authorities : any,iduser : string}>(this.url.urlAddress + ':8082/authenticate', data).pipe(tap(data => {
    localStorage.setItem('access_token', data.jwt);
    localStorage.setItem('user' , data.iduser );
    localStorage.setItem('role', data.authorities[0].authority);
  }))
  }

  logout() {
    localStorage.clear();
  }
*/
  public get loggedIn(): boolean{
    return localStorage.getItem('currentUser') !==  "";
  }

  
}
export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  token?: string;
}
 