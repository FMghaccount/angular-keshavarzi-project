import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('فروشگاه سبد - لیست محصولات');
  }
}
