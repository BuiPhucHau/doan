import { Test, TestingModule } from '@nestjs/testing';
import { PaymentstripeService } from './paymentstripe.service';

describe('PaymentstripeService', () => {
  let service: PaymentstripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentstripeService],
    }).compile();

    service = module.get<PaymentstripeService>(PaymentstripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
