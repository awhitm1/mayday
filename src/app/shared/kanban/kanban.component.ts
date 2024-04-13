import { Component, NgModule, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Ticket } from '../models/ticket.model';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';
import { Location } from '../models/location.model';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TicketComponent } from 'src/app/features/ticket/ticket.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [MatCardModule, FormsModule, DragDropModule, DatePipe, MatDividerModule, MatProgressBar, CommonModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  myTickets: Ticket[] = [];
  listsSub: Subscription = new Subscription();
  lists: {groups: Group[], locations: Location[], categories: Category[], statuses: Status[]} = {groups: [], locations: [], categories: [], statuses: []};

  currentUser: User = new User();

  constructor(private ticketService: TicketService, private authService: AuthService, private configService: ConfigurationService, public dialog: MatDialog ) {}

  ngOnInit(){
    // Set up subscriptions to the ticket service and configuration service
    this.ticketService.getTechsTickets().subscribe(tickets => {
      this.myTickets = tickets;
      console.log(tickets);
    });

    // Get the lists from the configuration service
    this.listsSub = this.configService.getLists().subscribe(lists => {
      this.lists = lists;
      this.lists.groups = lists.Groups;
      this.lists.locations = lists.Locations;
      this.lists.categories = lists.Categories;
      this.lists.statuses = lists.Statuses;
    });

    // Subscribe to the current user
    this.authService.userSubject.subscribe(user => {
      if (user){
        this.currentUser = user;
      }
    });
  }
  // Angular Material Drag and Drop functions
  drop(event: CdkDragDrop<Ticket[]>, ticketStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          // event.container.data[event.currentIndex].status=ticketStatus
      }

      // this.kanBanEditedTasks = this.kanBanTasksDone.concat(this.kanBanTasksInProgress, this.kanBanTasksToDo);
      // this.refreshList();
      // this.tasksService.updateAllTasks(this.kanBanEditedTasks);
  }

  ticketSelected(row: Ticket){
    this.dialog.open(TicketComponent, {
      data: {
        ticket: row,
        groups: this.lists.groups,
        locations: this.lists.locations,
        categories: this.lists.categories,
        statuses: this.lists.statuses,
        user: this.currentUser,
        isNew: false
      }
    });
  }

  // Filter tickets by statusID
  filterTickets(statusID: number){
    return this.myTickets.filter(ticket => ticket.status_id === statusID);
  }

  // Sort statuses so that Open is first and Closed is last
  sortStatuses(statuses: Status[]){
    return statuses.sort((a, b) => {
      if (a.name === 'Open') return -1;
      if (b.name === 'Open') return 1;
      if (a.name === 'Closed') return 1;
      if (b.name === 'Closed') return -1;
      return a.name.localeCompare(b.name);
    }
    );
  }

  // Methods to translate the id number to the name of the group, location, category, or status - used in the html
  findGroup(id: number){
    return this.lists.groups.find(group => group.id === id);
  }

  findLocation(id: number){
    return this.lists.locations.find(location => location.id === id);
  }

  findCategory(id: number){
    return this.lists.categories.find(category => category.id === id);
  }

  findStatus(id: number){
    return this.lists.statuses.find(status => status.id === id);
  }
}

