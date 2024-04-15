import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  heroImages = ['../../assets/1.jpeg', '../../assets/2.jpg', '../../assets/3.jpg'];

  constructor(private router: Router) { }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
