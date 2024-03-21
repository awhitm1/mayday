import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { DialogData } from '../config/config.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/category.model';
import { Status } from 'src/app/shared/models/status.model';
import { Group } from 'src/app/shared/models/group.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})

export class TicketComponent implements OnInit{
  // ticketSub = new Subscription();
  selectedTicket: Ticket = this.data.ticket || new Ticket();
  isNewTicket = this.data.isNew || true;
  locations: Location[] = this.data.locations || [];
  categories: Category[] = this.data.categories || [];
  statuses: Status[] = this.data.statuses || [];
  groups: Group[] = this.data.groups || [];
  currentUser: User = this.data.user;
  ticketForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status_id: new FormControl(''),
    location_id: new FormControl(''),
    category_id: new FormControl(''),
    user_id: new FormControl(''),
    group_id: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm() {
    this.ticketForm = this.formBuilder.group({
      title: [this.selectedTicket.title, Validators.required],
      description: [this.selectedTicket.description, Validators.required],
      status_id: [this.selectedTicket.status_id, Validators.required],
      location_id: [this.selectedTicket.location_id, Validators.required],
      category_id: [this.selectedTicket.category_id, Validators.required],
      user_id: [this.selectedTicket.user_id, Validators.required],
      group_id: [this.selectedTicket.group_id, Validators.required],
    });

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
