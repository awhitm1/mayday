import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {


  signUpForm = new FormGroup({
    f_name: new FormControl('', [Validators.required]),
    l_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  hide = true;
  errors:string[] = [];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}
  onSubmit(){
    if (!!this.signUpForm.value && this.signUpForm.value.password === this.signUpForm.value.password_confirmation && this.signUpForm.value.password !== null) {

      this.userService.createUser(this.signUpForm.value).subscribe({
        next: (user) => {
          console.log('User created: ', user);
          if (this.signUpForm.value.email !== undefined && this.signUpForm.value.email !== null && this.signUpForm.value.password !== undefined && this.signUpForm.value.password !== null) {
          this.authService.login(this.signUpForm.value.email, this.signUpForm.value.password).subscribe({
            next: (res) => {
              this.authService.setToken(res.token);
              this.authService.setUser(res.user);
              this.authService.currentUser.next(res.user);
              this.router.navigate(['/queue']);
            },
            error: (error) => {
              console.error('Error logging in: ', error);
              this.router.navigate(['/login']);
            }
          });
        }
        },
        error: (error) => {
          console.error('Error creating user: ', error.error.full_messages);
          this.errors = error.error.full_messages;
        }
      });
    }
  }
}
