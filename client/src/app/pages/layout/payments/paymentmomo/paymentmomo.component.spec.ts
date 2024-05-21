import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmomoComponent } from './paymentmomo.component';

describe('PaymentmomoComponent', () => {
  let component: PaymentmomoComponent;
  let fixture: ComponentFixture<PaymentmomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentmomoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentmomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
