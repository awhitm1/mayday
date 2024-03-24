import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  heroImages = ['../../../assets/1.jpeg', '../../../assets/2.jpg', '../../../assets/3.jpg']
  scrollPosition = 0;
  heroHeights = [0,0,0];

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    this.scrollPosition = window.scrollY;
    for (let i = 0; i < this.heroHeights.length; i++) {
      const heroElement = document.getElementById('hero' + (i + 1));
      if (heroElement) {
        this.heroHeights[i] = heroElement.offsetTop;
      }
    }
  }

}
