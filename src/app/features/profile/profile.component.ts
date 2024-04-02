import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [MatChipsModule, MatExpansionModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  panelOpenState = false;

  currentUserSub: Subscription = new Subscription();
  currentUser: User = new User();

  imageRootUrl = 'https://maydayhelpdeskapi.onrender.com';
  selectedFile: File | null = null;

  editProfileForm = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

  });

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.currentUserSub = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.initializeForm();

  }

  initializeForm() {
    this.editProfileForm = this.formBuilder.group({

      f_name: [this.currentUser.f_name, Validators.required],
      l_name: [this.currentUser.l_name, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.editProfileForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('f_name', this.editProfileForm.get('f_name')!.value!);
      formData.append('l_name', this.editProfileForm.get('l_name')!.value!);
      formData.append('email', this.editProfileForm.get('email')!.value!);
      formData.append('id', String(this.currentUser.id));
      formData.append('groups', JSON.stringify(this.currentUser.groups));
      formData.append('is_tech', String(this.currentUser.is_tech));
      formData.append('is_admin', String(this.currentUser.is_admin));
      formData.append('active', String(this.currentUser.active));
      formData.append('profile_image', this.selectedFile, this.selectedFile.name);

      this.userService.updateProfileUser(formData).subscribe({
        next: (user: User) => {
          console.log('User Updated', user);
          this.panelOpenState = false;
          // this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error updating user', error);
        },
      });
    }
  }
}
