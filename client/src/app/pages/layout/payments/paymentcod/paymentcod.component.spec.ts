import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentcodComponent } from './paymentcod.component';

describe('PaymentcodComponent', () => {
  let component: PaymentcodComponent;
  let fixture: ComponentFixture<PaymentcodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentcodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentcodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
