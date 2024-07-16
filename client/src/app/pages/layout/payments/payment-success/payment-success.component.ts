import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ShareModule } from '../../../../shared/shared.module';
import { CartService } from '../../../../service/cart/cart.service';
import { BillService } from '../../../../service/bill/bill.service';
import { BillPdfService } from '../../../../service/billpdf/billpdf.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
  bill: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private billService: BillService,
    private billPdfService: BillPdfService
  ) { }
   item = this.billService.getBillFromPaymentSuccess();
  // Generate PDF
   async generatePDF() {
    if (this.item) {
      const pdfBytes = await this.billPdfService.createPDF(this.item);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }

  // Remote all cart
  remoteAllCart() {
    this.cartService.clearCart();
    // this.reservationService.clearItemTable();
  }
  // check out
  checkOut() {
    this.remoteAllCart();
    this.router.navigate(['base/home']);
  };
}
