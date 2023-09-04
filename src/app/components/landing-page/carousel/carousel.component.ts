import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig],
})
export class CarouselComponent {
  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
