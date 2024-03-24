import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  heroImage1 = '../../../assets/1.jpeg';
  heroImage2 = '../../../assets/2.jpeg';
  scrollPosition = 0;

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    this.scrollPosition = window.scrollY;
  }

}
