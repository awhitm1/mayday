import { Injectable, OnDestroy } from '@angular/core';
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
export class TicketService implements OnDestroy {
  currentUserSub: Subscription = new Subscription();
  currentUser: User | null = null;
  usersTickets = new BehaviorSubject<Ticket[]>([]);
  groupsList = new BehaviorSubject<Ticket[]>([]);


  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUserSub = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.getUsersTickets().subscribe(tickets => {
        this.usersTickets.next(tickets);
      });
    });
  }

  getAllTickets(){
    return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets`);
  }

  getUsersTickets(){
    if (this.authService.getToken()) {
      return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets_created`);
    } else {
    return new Observable<Ticket[]>();
    }
  }

  getTicket(id: number){
    return this.http.get<Ticket>(`${environment.apiUrl}/tickets/${id}`);
  }

  createTicket(ticket: Ticket){
    return this.http.post<Ticket>(`${environment.apiUrl}/tickets`, ticket);
  }

  updateTicket(ticket: Ticket){
    return this.http.put<Ticket>(`${environment.apiUrl}/tickets/${ticket.id}`, ticket);
  }

  deleteTicket(id: number){
    return this.http.delete<Ticket>(`${environment.apiUrl}/tickets/${id}`);
  }

  getTechsTickets(){
    return this.http.get<Ticket[]>(`${environment.apiUrl}/assigned_tickets`);
  }

  getGroupsTickets(){
    return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets_by_group`);
  }

  getLocationsTickets(){
    return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets_location`);
  }

  getCategoriesTickets(){
    return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets_category`);
  }

  getLists(){
    return this.http.get<any>(`${environment.apiUrl}/lists`);
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
