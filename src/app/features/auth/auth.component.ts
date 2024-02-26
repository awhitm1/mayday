import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
        this.authService.setToken(res.token);
        this.router.navigate(['/queue']);
      },
      error: err => {
        console.error(err);
      }
    });
  }


}
