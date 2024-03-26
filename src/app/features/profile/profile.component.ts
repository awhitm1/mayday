import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUserSub: Subscription = new Subscription();
  currentUser: User = new User();

  constructor(private authService: AuthService) {
    this.currentUserSub = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(){
    console.log('Current User: ', this.currentUser);
  }
}
