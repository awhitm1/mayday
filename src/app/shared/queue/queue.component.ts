import { AfterViewInit, OnInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { Ticket } from 'src/app/shared/models/ticket.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSidenavModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatToolbarModule, MatIconModule],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent implements AfterViewInit, OnInit, OnDestroy {
  events: string[] = [];
  // homeTickets: Ticket[] = [];
  opened: boolean = true;
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  tickets: Ticket[] = [];
  displayedColumns: string[] = ['created_at', 'user_id', 'title', 'description', 'status_id', 'group_id', 'assigned_tech', 'category_id', 'location_id'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource(this.tickets);
  currentUser = this.authService.getUser();
  usersTicketsSub: Subscription = new Subscription();
  usersTickets: Ticket[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticketService: TicketService, private authService: AuthService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.usersTicketsSub = this.ticketService.usersTickets.subscribe(tickets => {
      this.usersTickets = tickets;
      this.dataSource = new MatTableDataSource(this.usersTickets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.usersTicketsSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMyTickets(){
    this.usersTickets = this.ticketService.usersTickets.value;
    this.dataSource = new MatTableDataSource(this.usersTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
