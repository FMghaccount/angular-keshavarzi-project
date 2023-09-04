import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  email: string;

  constructor(private toastr: ToastrService) {}

  addEmail() {
    if (this.email) {
      this.toastr.success('تبریک شما به خبرنامه ما پیوستید', 'ارسال شد!', {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      });
    } else {
      this.toastr.error('لطفاً ایمیل خود را وارد کنید', 'خطا رخ داد!', {
        timeOut: 4000,
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
      });
    }
  }
}
