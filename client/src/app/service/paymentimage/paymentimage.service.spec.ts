import { TestBed } from '@angular/core/testing';

import { PaymentimageService } from './paymentimage.service';

describe('PaymentimageService', () => {
  let service: PaymentimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
