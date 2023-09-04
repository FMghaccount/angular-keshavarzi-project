import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent {}
