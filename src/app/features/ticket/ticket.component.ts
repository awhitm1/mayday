import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit, OnDestroy {
  allTicketSub!: Subscription;
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    // this.allTicketSub = this.ticketService.getTickets().subscribe({
    //   next: tickets => {
    //     console.log(tickets);
    //   },
    //   error: err => {
    //     console.error(err);
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.allTicketSub.unsubscribe();
  }
}
