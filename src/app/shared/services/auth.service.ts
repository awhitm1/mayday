import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenSubject = new BehaviorSubject<string | null>(null);
  userSubject = new BehaviorSubject< User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    console.log('Auth Service Initialized');
    if (this.getToken() && this.getUser()) {
      this.tokenSubject.next(this.getToken());
      this.userSubject.next(this.getUser());
    }
  }


  login(email: string, password:string){
    console.log('Logging in with username: ', email, ' and password: ', password);
    return this.http.post<{token: string, user: User}>(`${environment.apiUrl}login`, {email, password});
  }

  setToken(token: string){
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setUser(user: any){
    localStorage.setItem('user', user);
    this.userSubject.next(JSON.parse(user));
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getAdmin(){
    return JSON.parse(localStorage.getItem('user') || '{}').is_admin;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  getCurrentUser(){
    return this.http.get<User>(`${environment.apiUrl}current_user`);
  }
}
