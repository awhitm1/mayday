import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/shared/models/ticket.model';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
export class QueueComponent implements AfterViewInit {
  @Input({required: true}) tickets: Ticket[] = [];
  displayedColumns: string[] = ['date', 'created_by', 'title', 'description', 'status', 'group', 'assigned_tech', 'category', 'location'];
  dataSource: MatTableDataSource<TicketData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.tickets);
  }

  ngAfterViewInit() {
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
