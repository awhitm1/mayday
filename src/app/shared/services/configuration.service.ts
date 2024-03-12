import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getLists(){
    return this.http.get<any>(`${environment.apiUrl}/lists`);
  }

  addGroup(name: string){
    return this.http.post<any>(`${environment.apiUrl}/config/add_group`, {name: name});
  }

  addStatus(name: string){
    return this.http.post<any>(`${environment.apiUrl}/config/add_status`, {name: name});
  }

  addLocation(name: string){
    return this.http.post<any>(`${environment.apiUrl}/config/add_location`, {name: name});
  }

  addCategory(name: string){
    return this.http.post<any>(`${environment.apiUrl}/config/add_category`, {name: name});
  }

}
