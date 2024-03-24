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
  heroImage2 = '../../../assets/2.jpg';
  heroImage3 = '../../../assets/3.jpg';
  scrollPosition = 0;
  heroHeight = 0;

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    this.scrollPosition = window.scrollY;
    let hero1 = document.getElementById('hero1');
    if (hero1) {
      this.heroHeight = hero1.clientHeight;
    }
  }

}
