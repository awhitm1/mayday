import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Group } from 'src/app/shared/models/group.model';
import { Category } from 'src/app/shared/models/category.model';
import { Status } from 'src/app/shared/models/status.model';
import { Location } from 'src/app/shared/models/location.model';
import { Ticket } from 'src/app/shared/models/ticket.model';
import { FormsModule } from '@angular/forms';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, FormsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit, AfterViewInit, OnDestroy{
  // Subscriptions
  userSub: Subscription = new Subscription();
  users: User[] = [];
  listsSub: Subscription = new Subscription();
  lists: {groups: Group[], locations: Location[], categories: Category[], statuses: Status[]} = {groups: [], locations: [], categories: [], statuses: []};

  // Mat-table items
  displayedColumns: string[] = ['f_name', 'l_name', 'is_tech', 'is_admin', 'active', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource(this.users);

  // Input variables
  new_group: string = '';
  new_status: string = '';
  new_location: string = '';
  new_category: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private configService: ConfigurationService, private userService: UserService) {}

  ngOnInit(){
    this.listsSub = this.configService.getLists().subscribe(lists => {
      this.lists = lists;
      this.lists.groups = lists.Groups;
      this.lists.locations = lists.Locations;
      this.lists.categories = lists.Categories;
      this.lists.statuses = lists.Statuses;
    });

    this.userSub = this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log('Users: ', this.users);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(){
    this.listsSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addGroup(name: string){
    this.configService.addGroup(name).subscribe(group => {
      this.lists.groups.push(group);
      this.new_group = '';
    });
  }

  addStatus(name: string){
    this.configService.addStatus(name).subscribe(status => {
      this.lists.statuses.push(status);
      this.new_status = '';
    });
  }

  addLocation(name: string){
    this.configService.addLocation(name).subscribe(location => {
      this.lists.locations.push(location);
      this.new_location = '';
    });
  }

  addCategory(name: string){
    this.configService.addCategory(name).subscribe(category => {
      this.lists.categories.push(category);
      this.new_category = '';
    });
  }

}
