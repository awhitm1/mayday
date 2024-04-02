import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatChipsModule, MatExpansionModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  panelOpenState = false;

  currentUserSub: Subscription = new Subscription();
  currentUser: User = new User();

  imageRootUrl = 'https://maydayhelpdeskapi.onrender.com';
  selectedFile: File | null = null;

  editProfileForm = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    id: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.currentUserSub = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {this.userService.uploadProfileImage(this.selectedFile, this.currentUser.id).subscribe({
        next: (res: any) => {
          console.log('Image Uploaded', res);
          this.currentUser.profile_image_url = res.profile_image_url;
        },
        error: (error: any) => {
          console.error('Error uploading image', error);
        },
      })};
      this.panelOpenState = false;
    }
  }

  onSubmit() {
    if (this.editProfileForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('f_name', this.editProfileForm.get('f_name')!.value!);
      formData.append('l_name', this.editProfileForm.get('l_name')!.value!);
      formData.append('email', this.editProfileForm.get('email')!.value!);
      formData.append('id', String(this.currentUser.id));
      formData.append('profile_image', this.selectedFile, this.selectedFile.name);

      this.userService.updateProfileUser(formData).subscribe({
        next: (user: User) => {
          console.log('User Updated', user);
          // this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error updating user', error);
        },
      });
    }
  }
}
