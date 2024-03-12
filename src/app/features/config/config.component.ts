import { Component, OnDestroy, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit, OnDestroy{
  listsSub: Subscription = new Subscription();
  lists: {groups: Group[], locations: Location[], categories: Category[], statuses: Status[]} = {groups: [], locations: [], categories: [], statuses: []};
  new_group: string = '';
  new_status: string = '';
  new_location: string = '';
  new_category: string = '';


  constructor(private configService: ConfigurationService) {}

  ngOnInit(){
    this.listsSub = this.configService.getLists().subscribe(lists => {
      this.lists = lists;
      this.lists.groups = lists.Groups;
      this.lists.locations = lists.Locations;
      this.lists.categories = lists.Categories;
      this.lists.statuses = lists.Statuses;
    });
  }

  ngOnDestroy(){
    this.listsSub.unsubscribe();
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
