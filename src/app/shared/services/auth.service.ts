import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  
}
