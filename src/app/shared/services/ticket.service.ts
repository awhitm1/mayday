import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}

  // getTickets(): Observable<Ticket[]> {
  //   return this.http.get<Ticket[]>(`${environment.apiUrl}/tickets`);
  // }

  workingTickets(){

  }
}
