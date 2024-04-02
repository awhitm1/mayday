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
    this.currentUserSub = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(form: any) {

      console.log('Form Submitted', this.currentUser);
      console.log('Form', form.value);
      const formData = new FormData();
      formData.append('f_name', String(form.value.f_name));
      formData.append('l_name', String(form.value.l_name));
      formData.append('email', String(form.value.email));
      formData.append('id', String(this.currentUser.id));
      formData.append('groups', JSON.stringify(this.currentUser.groups));
      formData.append('is_tech', String(this.currentUser.is_tech));
      formData.append('is_admin', String(this.currentUser.is_admin));
      formData.append('active', String(this.currentUser.active));
      if (this.selectedFile) {
        formData.append('profile_image', this.selectedFile, this.selectedFile.name);
      }
      console.log('Form Data', formData);

      // this.userService.updateProfileUser(formData).subscribe({
      //   next: (user: User) => {
      //     console.log('User Updated', user);
      //     this.panelOpenState = false;
      //   },
      //   error: (error: any) => {
      //     console.error('Error updating user', error);
      //   },
      // });

  }
}
