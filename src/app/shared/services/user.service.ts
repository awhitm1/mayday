import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


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
    return this.http.get<boolean>(`${environment.apiUrl}users_is_tech`);
  }

  createUser(user: User | any){
    return this.http.post<User>(`${environment.apiUrl}users`, user);
  }

  getUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}users`);
  }

  showUser(id: number){
    return this.http.get<User>(`${environment.apiUrl}users/${id}`);
  }

  delUser(id: number){
    return this.http.delete<User>(`${environment.apiUrl}users/${id}`);
  }

  updateUser(user: User){
    console.log('User: ', user)

    const editedUser = {
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      active: user.active || true,
      is_tech: user.is_tech || false,
      is_admin: user.is_admin || false,
      groups: user.groups?.map(group => group.id) || []
    }
    console.log('Edited User groups: ', editedUser.groups)
    return this.http.put<User>(`${environment.apiUrl}users/${user.id}`, editedUser);
  }

  uploadProfileImage(image: File, id: number){
    const formData = new FormData();
    formData.append('profile_image', image);
    return this.http.post<User>(`${environment.apiUrl}users/${id}/upload_image`, formData);
  }
}
