import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ref-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ref-page.component.html',
  styleUrls: ['./ref-page.component.css']
})
export class RefPageComponent {

}
