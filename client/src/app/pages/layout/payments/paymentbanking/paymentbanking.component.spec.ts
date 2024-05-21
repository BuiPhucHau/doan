import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentbankingComponent } from './paymentbanking.component';

describe('PaymentbankingComponent', () => {
  let component: PaymentbankingComponent;
  let fixture: ComponentFixture<PaymentbankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentbankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentbankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
