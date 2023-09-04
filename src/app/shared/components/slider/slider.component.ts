import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { Product } from '../../model/product.model';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input('relatedProducts') relatedProducts: Product[];

  constructor() {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  slides = [
    { id: '1', img: 'https://dummyimage.com/350x150/423b42/fff' },
    { id: '2', img: 'https://dummyimage.com/350x150/2a2b7a/fff' },
    { id: '3', img: 'https://dummyimage.com/350x150/1a2b7a/fff' },
    { id: '4', img: 'https://dummyimage.com/350x150/7a2b7a/fff' },
    { id: '5', img: 'https://dummyimage.com/350x150/9a2b7a/fff' },
    { id: '6', img: 'https://dummyimage.com/350x150/5a2b7a/fff' },
    { id: '7', img: 'https://dummyimage.com/350x150/4a2b7a/fff' },
  ];
}
