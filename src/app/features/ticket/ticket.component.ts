import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { DialogData } from '../config/config.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/category.model';
import { Status } from 'src/app/shared/models/status.model';
import { Group } from 'src/app/shared/models/group.model';
import { Location } from 'src/app/shared/models/location.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatSelectModule, MatFormFieldModule, DatePipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})

export class TicketComponent implements OnInit{
  dialogRef: MatDialogRef<TicketComponent>;
  viewOnly: boolean = false;
  selectedTicket: Ticket = this.data.ticket || new Ticket();
  isNewTicket = this.data.isNew;
  locations: Location[] = this.data.locations || [];
  categories: Category[] = this.data.categories || [];
  statuses: Status[] = this.data.statuses || [];
  groups: Group[] = this.data.groups || [];
  currentUser: User = this.data.user;
  users: User[] = this.data.users || [];
  newComment: string = '';

  ticketForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    status_id: new FormControl(''),
    location_id: new FormControl(''),
    category_id: new FormControl(''),
    user_id: new FormControl(''),
    group_id: new FormControl(''),
    comment_content: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder, dialogRef: MatDialogRef<TicketComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.ticketForm = this.formBuilder.group({
      id: [this.selectedTicket.id],
      title: [this.selectedTicket.title, Validators.required],
      description: [this.selectedTicket.description, Validators.required],
      status_id: [this.selectedTicket.status_id, Validators.required],
      location_id: [this.selectedTicket.location_id, Validators.required],
      category_id: [this.selectedTicket.category_id, Validators.required],
      user_id: [this.selectedTicket.user_id],
      group_id: [this.selectedTicket.group_id, Validators.required],
      comment_content: [this.newComment]
    });

  }

  onSubmit() {
    this.ticketService.createTicket(this.ticketForm.value).subscribe({
      next: (ticket: Ticket) => {
        console.log('Ticket created: ', ticket);
        this.dialogRef.close();
    },
    error: (error: any) => {
      console.error('Error creating ticket: ', error);
    }
  });
 }

  updateTicket(){
    this.ticketService.updateTicket(this.ticketForm.value).subscribe({
      next: (ticket: Ticket) => {
        console.log('Ticket updated: ', ticket);
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.error('Error updating ticket: ', error);
      }
    });
 }

 claimTicket(id: number){
    this.ticketService.claimTicket(id).subscribe({
      next: (ticket: Ticket) => {
        console.log('Ticket claimed: ', ticket);
       this.dialogRef.close();
      },
    error: (error: any) => {
      console.error('Error claiming ticket: ', error);
      }
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  findItemById(id: number, list: any[]){
    return list.find(item => item.id === id);
  }
}
