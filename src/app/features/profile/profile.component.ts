import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  }
}
