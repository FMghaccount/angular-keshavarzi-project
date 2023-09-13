import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('فروشگاه سبد - سبد خرید');
  }
}
