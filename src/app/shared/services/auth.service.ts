import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly tokenSubject = new BehaviorSubject<string | null>(null);
  public readonly userSubject = new BehaviorSubject< User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password:string){
    console.log('Logging in with username: ', email, ' and password: ', password);
    return this.http.post<{token: string, user: User}>(`${environment.apiUrl}/login`, {email, password});
  }

  setToken(token: string){
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(){
    return localStorage.getItem('token');
    console.log('Token: ', localStorage.getItem('token'));
  }

  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
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
    return this.http.get<User>(`${environment.apiUrl}/current_user`);
  }
}
