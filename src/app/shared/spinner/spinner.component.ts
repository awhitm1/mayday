import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {

  constructor(public loaderService: LoaderService) { }
}
