import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit{
  currentUser: User | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(){
    this.authService.userSubject.subscribe(user => {
      this.currentUser = user;
      console.log('Current User (nav): ', this.currentUser);
      console.log('CurrentUser first name (nav): ', this.currentUser?.f_name);
    });

    // const user = localStorage.getItem('user');
    // if (user !== null) {
    //   this.currentUser = JSON.parse(user);
    // }

  }

  logout() {
		this.authService.logout();
	}
}
