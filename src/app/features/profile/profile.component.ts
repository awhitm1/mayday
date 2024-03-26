import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUser = this.authService.getUser();

  constructor(private authService: AuthService) {}

  ngOnInit(){
    console.log('Current User: ', this.currentUser);
  }
}
