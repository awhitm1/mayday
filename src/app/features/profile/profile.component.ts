import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatChipsModule, MatExpansionModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  panelOpenState = false;

  currentUserSub: Subscription = new Subscription();
  currentUser: User = new User();

  imageRootUrl = 'https://maydayhelpdeskapi.onrender.com';
  selectedFile: File | null = null;



  constructor(private authService: AuthService, private userService: UserService) {
    this.authService.userSubject.subscribe(user => {
      if (user){
        this.currentUser = user;
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
      this.userService.uploadProfileImage(this.selectedFile, this.currentUser.id).subscribe({
        next: (user: User) => {
          console.log('Profile Image Updated', user);
          this.currentUser = user;
          this.panelOpenState = false;
        },
        error: (error: any) => {
          console.error('Error updating profile image', error);
        },
        })
      };
    }
  }

  onSubmit() {
    console.log('Submitting user', this.currentUser);

      this.userService.updateUser(this.currentUser).subscribe({
        next: (user: User) => {
          console.log('User Updated', user);
        },
        error: (error: any) => {
          console.error('Error updating user', error);
        },
      });

  }
}
