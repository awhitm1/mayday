import { AfterViewInit, OnInit, Component, Input, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/shared/models/ticket.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TicketService } from 'src/app/shared/services/ticket.service';

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
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent implements AfterViewInit, OnInit {
  @Input({required: true}) tickets: Ticket[] = [];
  displayedColumns: string[] = ['created_at', 'user_id', 'title', 'description', 'status_id', 'group_id', 'assigned_tech', 'category_id', 'location_id'];
  dataSource: MatTableDataSource<Ticket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticket: TicketService) {
    console.log(this.tickets);
    this.dataSource = new MatTableDataSource(this.tickets);
  }

  ngOnInit(): void {
    // this.ticket.getTickets().subscribe({
    //   next: tickets => {
    //     this.tickets = tickets;
    //     this.dataSource = new MatTableDataSource(this.tickets);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     console.log("Home Tickets: ", this.tickets);
    //   },
    //   error: err => {
    //     console.error(err);
    //   },
    // });
  }

  ngAfterViewInit() {
    console.log(this.tickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
