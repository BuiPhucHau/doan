import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ShareModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
  constructor(
    private router: Router
  ) { }
  // check out
  checkOut() {
    this.router.navigate(['base/home']);
  };
}
