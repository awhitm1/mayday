import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentUser: User | null = null;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
