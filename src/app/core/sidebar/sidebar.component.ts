import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavComponent} from '../nav/nav.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { QueueComponent } from 'src/app/shared/queue/queue.component';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, NavComponent, ReactiveFormsModule, MatFormFieldModule, MatToolbarModule, MatInputModule, MatIconModule, AppRoutingModule, QueueComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  events: string[] = [];
  homeTickets: Ticket[] = [];
  opened: boolean = true;
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  constructor(private _formBuilder: FormBuilder, private ticket: TicketService) {
  }

  // ngOnInit(): void {
  //   this.ticket.getTickets().subscribe({
  //     next: tickets => {
  //       this.homeTickets = tickets;
  //       console.log("Home Tickets: ", this.homeTickets);
  //     },
  //     error: err => {
  //       console.error(err);
  //     },
  //   });
  // }
}
