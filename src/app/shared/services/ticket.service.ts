import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  currentUserSub: Subscription = new Subscription();
  currentUser: User | null = null;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUserSub = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  // getTickets(): Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets`);
  // }

  usersTickets(){
    if (this.currentUser !== null) {
      return this.http.get<Ticket[]>(`${environment.apiUrl}/users/${this.currentUser.id}/tickets`);
    }
    return new Observable<Ticket[]>();
  }
}
