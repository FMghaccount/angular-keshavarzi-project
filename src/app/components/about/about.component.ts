import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('فروشگاه سبد - درباره ما');
  }
}
