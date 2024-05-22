import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-success-dialog',
  templateUrl: './payment-success-dialog.component.html',
  styleUrl: './payment-success-dialog.component.scss'
})
export class PaymentSuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<PaymentSuccessDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
