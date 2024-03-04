import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})

export class TicketComponent implements OnInit, OnDestroy{
  ticketSub = new Subscription();
  selectedTicket = new Ticket();
  isNewTicket = true;
  currentUser: User = new User();
  ticketForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status_id: new FormControl(''),
    location_id: new FormControl(''),
    category_id: new FormControl(''),
    user_id: new FormControl(''),
    group_id: new FormControl(''),
  });

  constructor(private ticketService: TicketService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] !== 'new') {
      console.log('Route: ', this.route.snapshot.params['id']);
      this.ticketSub = this.ticketService.getTicket(this.route.snapshot.params['id']).subscribe({
        next: (selectedTicket: Ticket) => {
          this.selectedTicket = selectedTicket;
          this.isNewTicket = false;
          this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          console.log('Selected Ticket: ', this.selectedTicket);
        },
        error: (error: any) => {
          console.error('Error getting tickets: ', error);
        }
      });
      console.log(localStorage.getItem('user'))
    }

  }

  ngOnDestroy(): void {
    this.ticketSub.unsubscribe();
  }

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

 updateTicket(){

 }

 claimTicket(id: number){
    this.ticketService.claimTicket(id).subscribe({
      next: (ticket: Ticket) => {
        console.log('Ticket claimed: ', ticket);
       this.router.navigate(['/queue']);
      },
    error: (error: any) => {
      console.error('Error claiming ticket: ', error);
      }
    });
  }
}
