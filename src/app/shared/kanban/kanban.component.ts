import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Ticket } from '../models/ticket.model';
import { ConfigurationService } from '../services/configuration.service';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { Category } from '../models/category.model';
import { Status } from '../models/status.model';
import { Location } from '../models/location.model';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  myTickets: Ticket[] = [];
  listsSub: Subscription = new Subscription();
  lists: {groups: Group[], locations: Location[], categories: Category[], statuses: Status[]} = {groups: [], locations: [], categories: [], statuses: []};

  constructor(private ticketService: TicketService, private authService: AuthService, private configService: ConfigurationService) {}

  ngOnInit(){
    this.ticketService.getTechsTickets().subscribe(tickets => {
      this.myTickets = tickets;
      console.log(tickets);
    });

    this.listsSub = this.configService.getLists().subscribe(lists => {
      this.lists = lists;
      this.lists.groups = lists.Groups;
      this.lists.locations = lists.Locations;
      this.lists.categories = lists.Categories;
      this.lists.statuses = lists.Statuses;
    });
  }

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

