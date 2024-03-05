import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

export interface newUser {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userIsTech = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isTech().subscribe(tech => {
      this.userIsTech.next(tech);
    });
   }

  isTech(){
    return this.http.get<boolean>(`${environment.apiUrl}/users_is_tech`);
  }

  createUser(user: User | any){
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }
}
