import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})

export class TicketComponent {
  ticketForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status_id: new FormControl(''),
    location_id: new FormControl(''),
    category_id: new FormControl(''),
    user_id: new FormControl(''),
    group_id: new FormControl(''),
  });

  constructor(private ticketService: TicketService, private router: Router) {}

  onSubmit() {
    this.ticketService.createTicket(this.ticketForm.value).subscribe({
      next: (ticket: Ticket) => {
        console.log('Ticket created: ', ticket);
        this.router.navigate(['/queue']);
    },
    error: (error: any) => {
      console.error('Error creating ticket: ', error);
    }
  });
 }

 goBack(){
    this.router.navigate(['/queue']);
 }
}
