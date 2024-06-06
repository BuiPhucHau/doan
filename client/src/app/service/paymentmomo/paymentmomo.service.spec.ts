import { TestBed } from '@angular/core/testing';

import { PaymentmomoService } from './paymentmomo.service';

describe('PaymentmomoService', () => {
  let service: PaymentmomoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentmomoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
