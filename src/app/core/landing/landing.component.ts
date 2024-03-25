import { Component, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  heroImages = ['../../assets/1.jpeg', '../../assets/2.jpg', '../../assets/3.jpg'];
  // scrollPosition = 0;
  // windowHeight = window.innerHeight;
  // heroTops = [0, 0, 0];

  // constructor(private el: ElementRef) {}

  // @HostListener('window:scroll', ['$event'])
  // scrollHandler() {
  //   this.scrollPosition = window.scrollY;
  //   for (let i = 0; i < this.heroTops.length; i++) {
  //     this.heroTops[i] = this.el.nativeElement.querySelector(`#hero${i + 1}`).getBoundingClientRect().top + window.scrollY;
  //   }
  // }

}
