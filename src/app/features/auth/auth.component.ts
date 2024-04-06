import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login(){
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        console.log('Logged in with token: ', res.token);
        console.log('User (from login): ', res.user);
        const currentUser: User = new User();
        currentUser.id = res.user.id;
        currentUser.email = res.user.email;
        currentUser.f_name = res.user.f_name;
        currentUser.l_name = res.user.l_name;
        currentUser.active = res.user.active;
        currentUser.is_admin = res.user.is_admin;
        currentUser.is_tech = res.user.is_tech;
        currentUser.token = res.token;
        console.log('User (from currentUser): ', currentUser);
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);
        this.router.navigate(['/queue']);
      },
      error: err => {
        console.error(err);
      }
    });
  }


}
