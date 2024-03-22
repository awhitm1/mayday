import { AfterViewInit, OnInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { Category } from 'src/app/shared/models/category.model';
import { Group } from 'src/app/shared/models/group.model';
import { Location } from 'src/app/shared/models/location.model';
import { Status } from 'src/app/shared/models/status.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Subscription, filter } from 'rxjs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketComponent } from 'src/app/features/ticket/ticket.component';
import { DatePipe } from '@angular/common';


export interface TicketData {
  id: number;
  title: string;
  description: string;
  status_id: number;
  location_id: number;
  category_id: number;
  user_id: number;
  tech_id: number;
  group_id: number;
}

@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSidenavModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatToolbarModule, MatIconModule, DatePipe, MatSlideToggleModule],
  providers: [DatePipe],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent implements AfterViewInit, OnInit, OnDestroy {
  viewClosed: boolean = false;
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  // tickets: Ticket[] = [];
  displayedColumns: string[] = ['created_at', 'user_id', 'title', 'description', 'status_id', 'group_id', 'assigned_tech', 'category_id', 'location_id'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  currentUser = this.authService.getUser();

  // Subscriptions
  isTechSub: Subscription = new Subscription();
  isTech: boolean = false;
  allTicketsSub: Subscription = new Subscription();
  allTickets: Ticket[] = [];

  // Get parameter lists
  listsSub: Subscription = new Subscription();
  groupList: Group[] = [];
  locationList: Location[] = [];
  categoryList: Category[] = [];
  statusList: Status[] = [];

  currentView: string = 'Created:';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticketService: TicketService, private configService: ConfigurationService, private authService: AuthService, private _formBuilder: FormBuilder, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listsSub = this.configService.getLists().subscribe(lists => {
      this.groupList = lists.Groups;
      this.locationList = lists.Locations;
      this.categoryList = lists.Categories;
      this.statusList = lists.Statuses;
    });

    this.isTechSub = this.userService.userIsTech.subscribe(tech => {
      this.isTech = tech;
      console.log('Is tech: ', this.isTech);
    });

    this.allTicketsSub = this.ticketService.getAllTickets().subscribe(tickets => {
      this.allTickets = tickets;
    });

    this.filterTickets();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.allTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.isTechSub.unsubscribe();
    this.allTicketsSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterTickets(){
    if (!this.viewClosed){
      // Filter out closed tickets - check if status exists first
      this.allTickets = this.allTickets.filter(ticket => {
        const status = this.statusList.find(status => status.id === ticket.status_id);
        return status ? status.name !== 'Closed' : false;
      });
      this.getMyTickets();
      this.dataSource = new MatTableDataSource(this.allTickets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else {
      this.allTickets = this.allTickets.filter(ticket => {
        const status = this.statusList.find(status => status.id === ticket.status_id);
        return status ? status.name === 'Closed' : true;
      });
      this.dataSource = new MatTableDataSource(this.allTickets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    console.log('All Tickets: ', this.allTickets);
  }

  switchToAllTickets(){
    this.currentView = 'All Tickets:';
    this.filterTickets();
    this.dataSource = new MatTableDataSource(this.allTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  switchToAssignedTickets(){
    this.currentView = 'Assigned:';
    this.filterTickets();
    this.allTickets = this.allTickets.filter(ticket => ticket.assigned_tech_id === this.currentUser.id);
    this.dataSource = new MatTableDataSource(this.allTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  switchToGroupTickets(){
    this.currentView = 'My Group Tickets:';
    this.filterTickets();
    this.allTickets = this.allTickets.filter(ticket => ticket.group_id === this.currentUser.group_id);
    this.dataSource = new MatTableDataSource(this.allTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMyTickets(){
    this.filterTickets();
    this.allTickets = this.allTickets.filter(ticket => ticket.user_id === this.currentUser.id);
    this.dataSource = new MatTableDataSource(this.allTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newTicket(){
    this.dialog.open(TicketComponent, {
      data: {
        ticket: new Ticket(),
        groups: this.groupList,
        locations: this.locationList,
        categories: this.categoryList,
        statuses: this.statusList,
        user: this.currentUser,
        isNew: true
      }
    });
  }

  rowSelected(row: Ticket){
    this.dialog.open(TicketComponent, {
      data: {
        ticket: row,
        groups: this.groupList,
        locations: this.locationList,
        categories: this.categoryList,
        statuses: this.statusList,
        user: this.currentUser,
        isNew: false
      }
    });
  }

}
