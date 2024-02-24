import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: tickets => {
        console.log(tickets);
      },
      error: err => {
        console.error(err);
      },
    });
  }
}
